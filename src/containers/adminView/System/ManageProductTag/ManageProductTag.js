import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import Select from 'react-select';
import CustomPagination from '../../../../components/CustomPagination';

import LoadingOverlay from 'react-loading-overlay'
import ProductRowItem from '../ManageProduct/components/ProductRowItem';

class ManageProductTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            listSelectedProductsId: [],
            listTag: [],
            selectedTag: [],

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
        await this.props.getAllTagWithoutProduct();

        if (this.props.allProductArr) {
            this.setState({
                totalRecords: this.props.allProductArr.length,
                searchKey: '',
            });
        }

        let dataTag = this.buildDataInputSelect(this.props.allTagArr, 'tag');
        this.setState({
            listTag: dataTag,
            selectedTag: dataTag[0]
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevState.searchKey !== this.state.searchKey) {
            let dataProduct = this.buildDataInputSelect(this.props.allProductArr, 'product');
            let tempList = dataProduct;
            let query = this.state.searchKey;

            tempList = tempList.filter((item) => {
                return item.product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });

            this.setState({
                listProduct: tempList,
                listSelectedProductsId: prevState.listSelectedProductsId
            })
        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            let dataProduct = this.buildDataInputSelect(this.props.allProductArr, 'product');
            this.setState({
                listProduct: dataProduct,
                totalRecords: this.props.allProductArr.length
            })
        }

        if (prevProps.allTagArr !== this.props.allTagArr) {
            let dataTag = this.buildDataInputSelect(this.props.allTagArr, 'tag');
            this.setState({
                listTag: dataTag,
            })
        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            let message = this.props.lang === languages.VI ?
                this.props.actionResponse.messageVI : this.props.actionResponse.messageEN;

            if (this.props.actionResponse.errCode === 0) {
                // toast.success(message)
                this.setState({
                    checkAll: false,
                })
            } else {
                // toast.error(message)
            }
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === 'product') {
                inputData.map((item, index) => {
                    let obj = {};

                    obj.product = item;
                    obj.selected = false;
                    result.push(obj);
                });
            }

            if (type === 'tag') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.id = item.id;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
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

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleApplyDiscount();
        }
    }

    handleApplyTag = async () => {
        let { listSelectedProductsId, selectedTag } = this.state
        await this.props.createProductTag({
            listSelectedProductsId: listSelectedProductsId,
            selectedTag: selectedTag
        })
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

    handleOnChange = (selectedTag) => {
        this.setState({
            selectedTag: selectedTag,
        })
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

    handleEdit = (item) => {
        console.log(item)
    }

    handleDelete = (item) => {
        console.log(item)
    }

    renderProductsTableData = (products) => {
        let { lang } = this.props
        return (
            <>
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        let tagLabelVI = item.product.ProductTags && item.product.ProductTags.length > 0
                            && item.product.ProductTags[0].Tag &&
                            item.product.ProductTags[0].Tag.valueVI ? item.product.ProductTags[0].Tag.valueVI : ''
                        let tagLabelEN = item.product.ProductTags && item.product.ProductTags.length > 0
                            && item.product.ProductTags[0].Tag &&
                            item.product.ProductTags[0].Tag.valueEN ? item.product.ProductTags[0].Tag.valueEN : ''

                        return (
                            <>
                                <tr key={item.id} className={item.selected ? 'product-discount-item selected' : 'product-discount-item'}
                                    onClick={() => this.handleClickProductRow(item)}>
                                    <td scope="row">
                                        <input type="checkbox" id={`product${item.id}`} value={item}
                                            checked={item.selected} />
                                    </td>
                                    <td>{index + 1}</td>
                                    <ProductRowItem productId={item.product.id}
                                        category={'on'}
                                        actions={'off'}
                                        discount={'off'}
                                        tag={'on'}
                                        price={'off'} />
                                    <td>{lang === languages.VI ? tagLabelVI : tagLabelEN}</td>
                                </tr >
                            </>
                        )
                    })
                }
            </>
        )
    };

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
            startIndex, endIndex, checkAll, searchKey, listTag, selectedTag } = this.state;
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
                            Quản lý thẻ sản phẩm
                        </div>

                        <div className='manage-discount-actions'>

                            <label>Chọn thẻ cho sản phẩm:</label>
                            <Select
                                className={'select-tag'}
                                value={selectedTag}
                                onChange={this.handleOnChange}
                                options={listTag}
                                name="selectedTag" />

                            <button className=' btn-primary' onClick={() => this.handleApplyTag()}
                            >Áp dụng </button>

                        </div>

                        <div className='manage-discount-actions'>
                            <label>Tìm sản phẩm theo tên:</label>
                            <input type='text'
                                id='searchKey'
                                value={searchKey}
                                onChange={(event) => this.hanleOnChangeInput(event)}
                                className='form-control' />
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
                                        <th>Thẻ sản phấm</th>
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
                </LoadingOverlay >
            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allTagArr: state.admin.allTagArr,
        allProductArr: state.admin.allProductArr,
        actionResponse: state.admin.actionResponse,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),
        getAllTagWithoutProduct: () => dispatch(actions.getAllTagWithoutProduct()),
        createProductTag: (inputData) => dispatch(actions.createProductTag(inputData)),
        updateProductTag: (inputData) => dispatch(actions.updateProductTag(inputData)),
        deleteProductTag: (inputData) => dispatch(actions.deleteProductTag(inputData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageProductTag));
