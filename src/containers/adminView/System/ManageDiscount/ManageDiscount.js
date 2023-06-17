import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ManageDiscount.scss';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import Select from 'react-select';
import CustomPagination from '../../../../components/CustomPagination';

import NumericFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay'

class ManageDiscount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            listSelectedProducts: [],
            isLoading: false,
            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: ""
        };
    }

    async componentDidMount() {
        await this.props.fetchAllProduct();
        if (this.props.allProductArr) {
            this.setState({
                totalRecords: this.props.allProductArr.length
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevState.currentPage !== this.state.currentPage) {
            console.log(prevState)
        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            let dataProduct = this.buildDataInputSelect(this.props.allProductArr);
            this.setState({
                listProduct: dataProduct
            })
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

    handleCheckThisProduct = (event) => {
        // let selectedProduct = Object.values(event.target)[2].initialValue
        let selectedProduct = Object.values(event.target)[2].initialValue

        console.log(event.target.checked, selectedProduct)

        // let copyState = { ...this.state };

        // if (event.target.checked === true) {
        //     copyState.listSelectedProducts.push(selectedProduct);
        // }

        // if (event.target.checked === false) {
        //     copyState.listSelectedProducts = copyState.listSelectedProducts.filter(item => item.id !== selectedProduct.id);
        // }

        // this.setState({ ...copyState });
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
                                <tr key={index} className='product-discount-item'>
                                    <th scope="row">
                                        <input type="checkbox" id="product${}" value={item}
                                            checked={item.selected}
                                            onClick={(event) => this.handleCheckThisProduct(event)}
                                        />
                                    </th>
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
            startIndex, endIndex } = this.state;
        let rowsPerPage = [];

        rowsPerPage = listProduct.slice(startIndex, endIndex + 1);

        console.log(rowsPerPage)
        // console.log(this.state.listSelectedProducts)

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


                        {/* <div className='sharing-manage-sort'>
                            <div className='sharing-manage-sort-title'>
                                Tìm kiếm sản phẩm
                            </div>

                            <div className='sharing-sort-section'>
                                <label className='col-3 form-group'>Tìm theo danh mục:</label>
                                <div className='col-3 form-group'>
                                    <Select
                                        value={selectedCategory}
                                        onChange={this.handleChangeCategory}
                                        options={listCategory}
                                        placeholder={'Danh mục chính'}
                                        name="selectedCategory" />
                                </div>
                                <div className='col-3 form-group'>
                                    <Select
                                        value={selectedSubCategory}
                                        onChange={this.handleChangeSubCategory}
                                        options={listSubCategory}
                                        placeholder={'Danh mục phụ'}
                                        name="selectedSubCategory" />
                                </div>
                                <div className='col-3 form-group'>
                                    <Select
                                        value={selectedChildCategory}
                                        onChange={this.handleChangeChildCategory}
                                        options={listChildCategory}
                                        placeholder={'Danh mục con'}
                                        name="selectedChildCategory" />
                                </div>
                            </div>


                        </div> */}
                        <div className='manage-sharing-table'>
                            <table className='sharing-table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
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
                                pageLimit={pageLimit || 5}
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
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageDiscount));
