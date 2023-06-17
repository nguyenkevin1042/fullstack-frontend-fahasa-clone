import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageProduct.scss';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import Select from 'react-select';
import CustomPagination from '../../../../components/CustomPagination';

import NumericFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay'

class ManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenedAddModal: false,
            isOpenedEditModal: false,
            listProduct: [],
            selectedProduct: '',
            isLoading: false,

            listCategory: [], selectedCategory: '',
            listSubCategory: [], selectedSubCategory: '',
            listChildCategory: [], selectedChildCategory: '',

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
        await this.props.fetchAllCodesByType('category')

        if (this.props.allProductArr) {
            this.setState({
                totalRecords: this.props.allProductArr.length
            });
        }
        // let dataSelectCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
        // this.setState({
        //     listCategory: dataSelectCategory
        // })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            this.setState({
                listProduct: this.props.allProductArr
            })
        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
            })
        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSelect
            })
        }

        if (prevProps.allChildCategoryArr !== this.props.allChildCategoryArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allChildCategoryArr, "childCategory");
            this.setState({
                listChildCategory: dataSelect
            })
        }


    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === "category") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyMap = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "childCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }

        }

        return result;
    }

    handleChangeCategory = async (selectedCategory) => {
        this.setState({
            selectedCategory: selectedCategory,
            selectedSubCategory: '',
            selectedChildCategory: ''
        })
        // await this.props.fetchAllSubCategoryByCategory(selectedCategory.keyMap);
    }

    handleChangeSubCategory = async (selectedSubCategory) => {
        this.setState({
            selectedSubCategory: selectedSubCategory,
            selectedChildCategory: ''
        })
        await this.props.fetchAllChildCategoryBySubCategory(selectedSubCategory.keyName)
    }

    handleChangeChildCategory = (selectedChildCategory) => {
        this.setState({
            // categoryKeyName: selectedChildCategory.keyName,
            selectedChildCategory: selectedChildCategory
        })
    }

    handleOpenAddProductModal = () => {
        this.setState({
            isOpenedAddModal: true
        })
    }

    handleCloseAddProductModal = async () => {
        this.setState({
            isOpenedAddModal: false
        })
        await this.props.fetchAllProduct();
    }

    handleEdit = (item) => {
        this.setState({
            isOpenedEditModal: true,
            selectedProduct: item
        })
    }

    handleCloseEditProductModal = async () => {
        this.setState({
            isOpenedEditModal: false
        })
        await this.props.fetchAllProduct();

    }

    handleDelete = async (item) => {
        await this.props.deleteProduct(item.id)
        await this.props.fetchAllProduct();
    }

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

    renderProductsTableData = (products) => {

        return (
            <>
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        let imageBase64 = '';
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                        }
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td className='product-img'>
                                    <div className='img'
                                        style={{
                                            backgroundImage: "url(" + imageBase64 + ")"
                                        }} /></td>
                                <td>{this.renderCategoryOfProduct(item)}</td>
                                <td>{item.name}</td>
                                <td>
                                    <NumericFormat value={item.price}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} /></td>

                                <td>
                                    <button className='btn-edit'
                                        onClick={() => this.handleEdit(item)}
                                    > <i className="fas fa-pencil-alt"></i></button>
                                    <button className='btn-delete'
                                        onClick={() => this.handleDelete(item)}
                                    ><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
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
        let { isOpenedAddModal, isOpenedEditModal, selectedProduct,
            listCategory, selectedCategory,
            listSubCategory, selectedSubCategory,
            listProduct,
            listChildCategory, selectedChildCategory, isLoading } = this.state

        let { totalPages, currentPage, pageLimit,
            startIndex, endIndex } = this.state;
        let rowsPerPage = [];

        rowsPerPage = listProduct.slice(startIndex, endIndex + 1);

        return (
            <>
                <LoadingOverlay
                    active={isLoading}
                    spinner={true}
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            height: '100vh'
                        }),
                        spinner: (base) => ({
                            ...base,
                            width: '50px',
                            '& svg circle': {
                                stroke: '#F7941E'
                            }
                        })
                    }}
                    text='Please wait...'>
                    <div className='sharing-manage-container'>
                        <div className='sharing-manage-title'>
                            Quản lý sản phẩm
                        </div>

                        <div className='sharing-manage-add'>
                            <button className='add-btn btn btn-primary'
                                onClick={() => this.handleOpenAddProductModal()}>Thêm sản phẩm mới</button>
                        </div>

                        <div className='sharing-manage-sort'>
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


                        </div>

                        <div className='manage-sharing-table'>
                            <table className='sharing-table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Danh mục sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá sản phẩm</th>
                                        <th>Actions</th>
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
                    <AddProductModal
                        isOpenedAddModal={isOpenedAddModal}
                        closeModal={this.handleCloseAddProductModal} />
                    <EditProductModal
                        isOpenedEditModal={isOpenedEditModal}
                        closeModal={this.handleCloseEditProductModal}
                        product={selectedProduct} />
                </LoadingOverlay>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr,
        allCodesArr: state.admin.allCodesArr,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allChildCategoryArr: state.admin.allChildCategoryArr,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchAllChildCategory: () => dispatch(actions.fetchAllChildCategory()),
        fetchAllChildCategoryBySubCategory: (subCat) => dispatch(actions.fetchAllChildCategoryBySubCategory(subCat)),
        deleteProduct: (inputId) => dispatch(actions.deleteProduct(inputId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
