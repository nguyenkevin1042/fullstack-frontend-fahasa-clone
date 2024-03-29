import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductList.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";
import ProductItem from '../components/ProductItem';

import Select from 'react-select';
import CustomPagination from '../../../components/CustomPagination';
import LoadingOverlay from 'react-loading-overlay'

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyName: 'all-category',
            listCategory: [],
            listSubCategory: [],
            listChildCategory: [],
            selectedCategory: '',
            selectedSubCategory: '',
            selectedChildCategory: '',

            listProduct: [],
            isLoading: false,
            isProductListEmpty: false,

            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: "",

            selectedPageLimit: '',
            numberOfProductsArr: []
        };
    }

    async componentDidMount() {
        document.title = "Product List | Nguyenkevin1042's Fahasa Clone"

        let { category, subCategory, childCategory } = this.props.match.params

        this.setState({
            numberOfProductsArr: [
                { value: 12, label: (<FormattedMessage id="customer.product-list.sort.12-products" />) },
                { value: 24, label: (<FormattedMessage id="customer.product-list.sort.24-products" />) },
                { value: 48, label: (<FormattedMessage id="customer.product-list.sort.48-products" />) }

            ],
            selectedPageLimit: this.state.numberOfProductsArr[0]
        })

        if (category === 'all-category') {
            this.setState({
                keyName: 'all-category',
            })
            await this.props.fetchAllCodesByType('category')
            await this.props.fetchAllProduct()
        } else {
            if (subCategory) {
                if (childCategory) {
                    this.setState({
                        keyName: childCategory,
                    })
                    await this.props.fetchAllCodesByKeyMap(category)
                    await this.props.fetchAllSubCategoryByKeyName(subCategory)
                    await this.props.fetchChildCategoryByKeyName(childCategory)
                    await this.props.fetchAllChildCategoryBySubCategory(subCategory, childCategory)
                    await this.props.fetchAllProductByChildCategory(subCategory, childCategory)
                } else {
                    this.setState({
                        keyName: subCategory,
                    })
                    await this.props.fetchAllCodesByKeyMap(category)
                    await this.props.fetchAllSubCategoryByKeyName(subCategory)
                    await this.props.fetchAllChildCategoryBySubCategory(subCategory)
                    await this.props.fetchAllProductBySubCategory(category, subCategory)
                }
            } else {
                await this.props.fetchAllCodesByKeyMap(category)
                await this.props.fetchAllSubCategoryByCategory(category)
                await this.props.fetchAllProductByCategory(category)
                this.setState({
                    keyName: category,
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { category, subCategory, childCategory } = this.props.match.params

        if (prevState.numberOfProductsArr !== this.state.numberOfProductsArr) {
            this.setState({
                selectedPageLimit: this.state.numberOfProductsArr[0]
            })
        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.lang !== this.props.lang) {

            if (category === 'all-category') {
                this.setState({
                    keyName: 'all-category',
                })
                await this.props.fetchAllCodesByType('category')
                await this.props.fetchAllProduct()
            } else {
                if (subCategory) {
                    if (childCategory) {
                        this.setState({
                            keyName: childCategory,
                        })
                        await this.props.fetchAllCodesByKeyMap(category)
                        await this.props.fetchAllSubCategoryByKeyName(subCategory)
                        await this.props.fetchChildCategoryByKeyName(childCategory)
                        await this.props.fetchAllChildCategoryBySubCategory(subCategory, childCategory)
                        await this.props.fetchAllProductByChildCategory(subCategory, childCategory)
                    } else {
                        this.setState({
                            keyName: subCategory,
                        })
                        await this.props.fetchAllCodesByKeyMap(category)
                        await this.props.fetchAllSubCategoryByKeyName(subCategory)
                        await this.props.fetchAllChildCategoryBySubCategory(subCategory)
                        await this.props.fetchAllProductBySubCategory(category, subCategory)
                    }
                } else {
                    await this.props.fetchAllCodesByKeyMap(category)
                    await this.props.fetchAllSubCategoryByCategory(category)
                    await this.props.fetchAllProductByCategory(category)
                    this.setState({
                        keyName: category,
                    })
                }
            }
        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");

            if (dataCategory.length === 1) {
                this.setState({
                    selectedCategory: dataCategory[0]
                })
            } else {
                this.setState({
                    listCategory: dataCategory
                })
            }
        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
            let dataSubCategory = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSubCategory
            })
        }

        if (prevProps.subCategory !== this.props.subCategory) {
            let dataSubCategory = this.buildDataInputSelect(this.props.subCategory, "subCategory");
            this.setState({
                selectedSubCategory: dataSubCategory[0]
            })
        }

        if (prevProps.allChildCategoryArr !== this.props.allChildCategoryArr) {
            let dataChildCategory = this.buildDataInputSelect(this.props.allChildCategoryArr, "childCategory");
            this.setState({
                listChildCategory: dataChildCategory,
            })
        }

        if (prevProps.childCategory !== this.props.childCategory) {
            let dataChildCategory = this.buildDataInputSelect(this.props.childCategory, "childCategory");
            this.setState({
                selectedChildCategory: dataChildCategory[0],
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            if (this.props.allProductArr.length === 0) {
                this.setState({
                    isProductListEmpty: true
                })
            } else {
                this.setState({
                    listProduct: this.props.allProductArr,
                    isProductListEmpty: false
                })
            }
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === "category") {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.id = item.id
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.id = item.id
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
                    obj.id = item.id
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
        } else {
            if (type === "category") {
                let obj = {};
                let labelVI = inputData.valueVI;
                let labelEN = inputData.valueEN;

                obj.keyName = inputData.keyMap;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            }
        }

        return result;
    }

    handleOnClickAllCategory = async () => {
        if (this.props.history) {
            this.setState({
                keyName: 'all-category',
                selectedCategory: '',
                selectedSubCategory: '',
                selectedChildCategory: '',
                listSubCategory: [],
                listChildCategory: [],
                listProduct: []
            })
            this.props.history.push("/category/all-category");
            await this.props.fetchAllCodesByType('category')
            await this.props.fetchAllProduct()
        }
    }

    handleOnClickCategory = async (item) => {
        if (this.props.history) {
            this.setState({
                keyName: item.keyName,
                selectedCategory: item,
                selectedSubCategory: '',
                selectedChildCategory: '',
                listChildCategory: [],
                listProduct: []
            })
            this.props.history.push("/category/" + item.keyName);
            await this.props.fetchAllCodesByKeyMap(item.keyName)
            await this.props.fetchAllSubCategoryByCategory(item.keyName)
            await this.props.fetchAllProductByCategory(item.keyName)
        }
    }

    handleOnClickSubCategory = async (item) => {
        let { selectedCategory } = this.state

        if (this.props.history) {

            this.setState({
                keyName: item.keyName,
                selectedSubCategory: item,
                listProduct: []
            })
            await this.props.history.push("/category/" + selectedCategory.keyName + "/" + item.keyName);
            await this.props.fetchAllChildCategoryBySubCategory(item.keyName)
            await this.props.fetchAllSubCategoryByKeyName(item.keyName)
            await this.props.fetchAllProductBySubCategory(selectedCategory.keyName, item.keyName)
        }
    }

    handleOnClickChildCategory = async (item) => {
        let { selectedCategory, selectedSubCategory } = this.state
        if (this.props.history) {
            this.setState({
                keyName: item.keyName,
                selectedChildCategory: item,
                listProduct: []
            })
            this.props.history.push("/category/" + selectedCategory.keyName + "/" + selectedSubCategory.keyName + "/" + item.keyName);
            await this.props.fetchAllChildCategoryBySubCategory(selectedSubCategory.keyName)
            await this.props.fetchAllSubCategoryByKeyName(selectedSubCategory.keyName)
            await this.props.fetchChildCategoryByKeyName(item.keyName)
            await this.props.fetchAllChildCategoryBySubCategory(selectedSubCategory.keyName, item.keyName)
            await this.props.fetchAllProductByChildCategory(selectedSubCategory.keyName, item.keyName)
        }
    }

    handleOnChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
    };

    handleChangeNumberOfProducts = (event) => {
        this.setState({
            selectedPageLimit: event,
            pageLimit: event.value
        })
    }

    renderCategoryList = () => {
        let { listCategory, listSubCategory, listChildCategory,
            keyName, selectedCategory, selectedSubCategory,
            selectedChildCategory } = this.state
        return (
            <div className='sharing-menu'>
                <div className='sharing-title'>
                    <FormattedMessage id="customer.product-list.category.title" />
                </div>

                <div className='sharing-list-category'>
                    <div className={keyName === 'all-category' ?
                        'all-category-text active' : 'all-category-text hover'}
                        onClick={() => this.handleOnClickAllCategory()}>
                        <FormattedMessage id="customer.product-list.category.all-category" />
                    </div>

                    <div className='list-all-category'>
                        {keyName === 'all-category' && this.renderMainCategoryList(listCategory)}
                        {keyName === selectedCategory.keyName && this.renderSubCategoryList(listSubCategory)}
                        {keyName === selectedSubCategory.keyName && this.renderChildCategoryList(listChildCategory)}
                        {keyName === selectedChildCategory.keyName && this.renderChildCategoryList(listChildCategory)}
                    </div>
                </div>
            </div>
        )
    }

    renderMainCategoryList = (list) => {
        let { keyName } = this.state
        return (
            <>
                <ul className='list-category'>
                    {list && list.length > 0 &&
                        list.map((item, index) =>
                            <li key={item.id}
                                onClick={() => this.handleOnClickCategory(item)}
                                className={item.keyName === keyName ? 'active' : 'hover'}>
                                {item.label}
                            </li>
                        )
                    }
                </ul>
            </>
        )
    }

    renderSubCategoryList = (list) => {
        let { keyName, selectedCategory } = this.state

        return (
            <>
                <div className={(keyName === selectedCategory.keyName) ?
                    'list-category active' : 'list-category hover'}
                    onClick={() => this.handleOnClickCategory(selectedCategory)}>
                    {selectedCategory.label}
                </div>
                <ul className='list-sub-category'>
                    {list && list.length > 0 &&
                        list.map((item, index) =>
                            <li key={item.id}
                                onClick={() => this.handleOnClickSubCategory(item)}
                                className={item.keyName === keyName ? 'active' : 'hover'}>
                                {item.label}
                            </li>
                        )
                    }
                </ul>
            </>
        )
    }

    renderChildCategoryList = (list) => {
        let { keyName, selectedSubCategory, selectedCategory, } = this.state

        return (
            <>
                <div className={keyName === selectedCategory.keyName ?
                    'list-category active' : 'list-category hover'}
                    onClick={() => this.handleOnClickCategory(selectedCategory)}>
                    {selectedCategory.label}
                </div>
                <div className={keyName === selectedSubCategory.keyName ?
                    'list-sub-category active' : 'list-sub-category hover'}
                    onClick={() => this.handleOnClickSubCategory(selectedSubCategory)}>
                    {selectedSubCategory.label}
                </div >
                <ul className='list-child-category'>
                    {list && list.length > 0 &&
                        list.map((item, index) =>
                            <li key={item.id}
                                onClick={() => this.handleOnClickChildCategory(item)}
                                className={item.keyName === keyName ? 'active' : 'hover'}>
                                {item.label}
                            </li>
                        )

                    }
                </ul>
            </>
        )
    }

    renderProductList = (products) => {
        return (
            <>
                {products.map((item, index) => {
                    return (
                        <div key={item.id}
                            className='sharing-product-item-container col-4 col-md-3'>
                            <ProductItem productId={item.id} />
                        </div>
                    )
                }
                )}
            </>
        )
    }

    render() {
        let { isLoading, listProduct, keyName, selectedCategory, selectedSubCategory,
            totalPages, currentPage, pageLimit, startIndex, endIndex,
            selectedPageLimit, numberOfProductsArr, isProductListEmpty } = this.state;
        let rowsPerPage = [];

        rowsPerPage = listProduct.slice(startIndex, endIndex + 1);

        return (
            <React.Fragment>
                <Header />

                <div className='product-list-container'>
                    <div className='row'>
                        <div className='left-menu-content col-12 col-lg-3'>
                            <div className='left-content'>
                                {this.renderCategoryList()}
                            </div>
                        </div>
                        <div className='right-list-container col-12 col-lg-9'>

                            {/* SORT PRODUCT ACTION */}
                            <div className='sort-actions'>
                                <label>Săp xếp theo:</label>

                                {/* <Select
                                    className={"sort-actions-select"}
                                    // value={selectedCategory}
                                    // onChange={this.handleChangeCategory}
                                    // options={listCategory}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedCategory" /> */}

                                <Select
                                    className={"sort-actions-select"}
                                    value={selectedPageLimit}
                                    onChange={(event) => this.handleChangeNumberOfProducts(event)}
                                    options={numberOfProductsArr}
                                    name="selectedPageLimit" />
                            </div>
                            {/* LIST PRODUCT */}
                            <LoadingOverlay
                                classNamePrefix='Fullscreen_'
                                active={isLoading}
                                spinner={true}
                                text='Please wait...'>
                                <div className={isLoading === true ?
                                    'list-product-items hide container' :
                                    'list-product-items container'}>
                                    <div className='row'>

                                        {this.renderProductList(rowsPerPage)}

                                        {isProductListEmpty === true && (
                                            <div className='no-products-text'>
                                                <FormattedMessage id="customer.product-list.no-product" />
                                            </div>
                                        )}
                                    </div>

                                    <CustomPagination

                                        totalRecords={listProduct.length}
                                        pageLimit={pageLimit || 12}
                                        initialPage={1}
                                        pagesToShow={6}
                                        onChangePage={this.handleOnChangePage}
                                    />
                                </div>
                            </LoadingOverlay>
                        </div>
                    </div>
                </div>

                <SignUpNewletter />
                <Footer />
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allChildCategoryArr: state.admin.allChildCategoryArr,
        subCategory: state.admin.subCategory,
        childCategory: state.admin.childCategory,
        allProductArr: state.admin.allProductArr,
        actionResponse: state.admin.actionResponse,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchAllSubCategoryByKeyName: (subCategory) => dispatch(actions.fetchAllSubCategoryByKeyName(subCategory)),
        fetchAllChildCategoryBySubCategory: (subCategory) => dispatch(actions.fetchAllChildCategoryBySubCategory(subCategory)),
        fetchChildCategoryByKeyName: (keyName) => dispatch(actions.fetchChildCategoryByKeyName(keyName)),

        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),
        fetchAllCodesByKeyMap: (inputKeyMap) => dispatch(actions.fetchAllCodesByKeyMap(inputKeyMap)),
        fetchAllProductByCategory: (inputCategory) => dispatch(actions.fetchAllProductByCategory(inputCategory)),
        fetchAllProductBySubCategory: (inputCategory, inputSubCategory) => dispatch(actions.fetchAllProductBySubCategory(inputCategory, inputSubCategory)),
        fetchAllProductByChildCategory: (inputSubCategory, inputChildCategory) => dispatch(actions.fetchAllProductByChildCategory(inputSubCategory, inputChildCategory)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
