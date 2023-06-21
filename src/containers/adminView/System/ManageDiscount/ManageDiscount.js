import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ManageDiscount.scss';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import Select from 'react-select';
import { toast } from 'react-toastify';
import CustomPagination from '../../../../components/CustomPagination';

import NumericFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay'

class ManageDiscount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            listSelectedProductsId: [],
            discountNumber: '',
            checkAll: false,

            searchKey: '',

            isLoading: false,
            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: "",

        };
    }

    async componentDidMount() {
        await this.props.fetchAllProduct();

        if (this.props.allProductArr) {
            this.setState({
                totalRecords: this.props.allProductArr.length,
                searchKey: '',
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            let dataProduct = this.buildDataInputSelect(this.props.allProductArr);
            this.setState({
                listProduct: dataProduct,
                totalRecords: this.props.allProductArr.length
            })
        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            let message = this.props.lang === languages.VI ?
                this.props.actionResponse.messageVI : this.props.actionResponse.messageEN;

            if (this.props.actionResponse.errCode === 0) {
                toast.success(message)
                this.setState({
                    checkAll: false,
                })
            } else {
                toast.error(message)
            }
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};

                obj.product = item;
                obj.selected = false;
                result.push(obj);
            });

        }

        return result;
    }

    hanleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleKeyUp = (event) => {
        let query = event.target.value;
        let dataProduct = this.buildDataInputSelect(this.props.allProductArr);
        let tempList = dataProduct;
        tempList = tempList.filter((item) => {
            return item.product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });

        this.setState({
            searchKey: query,
            listProduct: tempList
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleApplyDiscount();
        }
    }

    handleApplyDiscount = async () => {
        let { discountNumber, listSelectedProductsId } = this.state
        await this.props.updateProductDiscount({ discountNumber, listSelectedProductsId })
    }

    handleCheckAll = (event) => {
        let tempList = this.state.listProduct;
        tempList.map((item) => item.selected = event.target.checked);

        let finalListSelectedProducts = this.state.listProduct.map(item => item.product.id)

        this.setState({
            checkAll: event.target.checked,
            listProduct: tempList,
            listSelectedProductsId: finalListSelectedProducts
        });
    }


    handleClickProductRow = (item) => {
        item.selected = !item.selected
        let tempList = this.state.listProduct;
        tempList.map((product) => {
            if (product.id === item.product.id) {
                product.selected = item.selected;
            }
            return product;
        });


        let finalListSelectedProducts = this.state.listProduct.filter((item) => item.selected)

        finalListSelectedProducts = finalListSelectedProducts.map(item => item.product.id)

        this.setState({
            listProduct: tempList,
            listSelectedProductsId: finalListSelectedProducts
        });
    }

    handleCheckThisProduct = (event, item) => {
        // item.selected = event.target.checked

        // let tempList = this.state.listProduct;
        // tempList.map((product) => {
        //     if (product.id === item.product.id) {
        //         product.selected = event.target.checked;
        //     }
        //     return product;
        // });


        // let finalListSelectedProducts = this.state.listProduct.filter((item) => item.selected)

        // finalListSelectedProducts = finalListSelectedProducts.map(item => item.product.id)

        // this.setState({
        //     listProduct: tempList,
        //     listSelectedProductsId: finalListSelectedProducts
        // });

    }

    renderProductsTableData = (products) => {
        return (
            <>
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        let productData = item.product
                        let imageBase64 = '';

                        if (productData.image) {
                            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
                        }

                        let salePrice = productData.price - ((productData.price * productData.discount) / 100);

                        return (
                            <>
                                <tr key={index} className={item.selected ? 'product-discount-item selected' : 'product-discount-item'}
                                    onClick={() => this.handleClickProductRow(item)}>
                                    <td scope="row">
                                        <input type="checkbox" id={`product${item.id}`} value={item}
                                            checked={item.selected} />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{productData.id}</td>
                                    <td className='product-img'>
                                        <div className='img'
                                            style={{
                                                backgroundImage: "url(" + imageBase64 + ")"
                                            }} /></td>
                                    <td>{this.renderCategoryOfProduct(productData)}</td>
                                    <td>{productData.name}</td>
                                    <td>
                                        <NumericFormat value={productData.price}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            suffix={'đ'} />
                                    </td>
                                    <td>{productData.discount}</td>
                                    <td>
                                        <NumericFormat value={salePrice}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            suffix={'đ'} />
                                    </td>
                                </tr >
                            </>
                        )
                    })

                }
            </>
        )
    };

    renderCategoryOfProduct = (item) => {
        let language = this.props.lang

        let category = item.ChildCategory.SubCategory.AllCode
        let subCategory = item.ChildCategory.SubCategory
        let childCategory = item.ChildCategory

        let categoryVI = category.valueVI
        let subCategoryVI = subCategory.valueVI
        let childCategoryVI = childCategory.valueVI

        let categoryEN = category.valueEN
        let subCategoryEN = subCategory.valueEN
        let childCategoryEN = childCategory.valueEN
        let rightArrow = String.fromCodePoint(parseInt(2192, 16))

        let result = language === languages.VI ?
            categoryVI + rightArrow + subCategoryVI + rightArrow + childCategoryVI :
            categoryEN + rightArrow + subCategoryEN + rightArrow + childCategoryEN
        return (
            <>{result}</>
        )
    }

    onChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
    };


    render() {
        let { listProduct, isLoading, totalPages, currentPage, pageLimit,
            startIndex, endIndex, checkAll, searchKey } = this.state;
        let rowsPerPage = [];

        rowsPerPage = listProduct.slice(startIndex, endIndex + 1);

        return (
            <>
                <LoadingOverlay
                    active={isLoading}
                    spinner={true}
                    text='Please wait...'>
                    <div className='sharing-manage-container'>
                        <div className='sharing-manage-title'>
                            Quản lý giảm giá sản phẩm
                        </div>

                        <div className='manage-discount-actions'>

                            <label>Nhập discount:</label>
                            <input type='number'
                                min={0} max={100}
                                id='discountNumber'
                                onChange={(event) => this.hanleOnChangeInput(event)}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                                className='form-control'
                            />
                            <button className=' btn-primary' onClick={() => this.handleApplyDiscount()}
                            >Áp dụng giảm giá</button>

                        </div>

                        <div className='manage-discount-actions'>
                            <label>Tìm sản phẩm theo tên:</label>
                            <input type='text'
                                id='searchKey'
                                value={searchKey}
                                onChange={(event) => this.hanleOnChangeInput(event)}
                                onKeyUp={(event) => { this.handleKeyUp(event) }}
                                className='form-control'
                            />
                        </div>

                        <div className='manage-sharing-table'>
                            <table className='sharing-table'>
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input
                                                type="checkbox"
                                                checked={checkAll}
                                                id="checkAll"
                                                onChange={(event) => this.handleCheckAll(event)}
                                            />
                                        </th>
                                        <th>STT</th>
                                        <th>Mã sản phẩm</th>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Danh mục sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá sản phẩm</th>
                                        <th>Giảm giá (%)</th>
                                        <th>Giá sản phẩm khi áp dụng giảm giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderProductsTableData(rowsPerPage)}
                                </tbody>
                            </table>

                            <CustomPagination
                                totalRecords={listProduct.length}
                                pageLimit={pageLimit || 10}
                                initialPage={1}
                                pagesToShow={5}
                                onChangePage={this.onChangePage}
                            />
                        </div>
                    </div>
                </LoadingOverlay>
            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr,
        actionResponse: state.admin.actionResponse,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),
        updateProductDiscount: (inputData) => dispatch(actions.updateProductDiscount(inputData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageDiscount));
