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
import Slider from 'react-slick';
import LoadingOverlay from 'react-loading-overlay'

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // keyName: 'all-category',
            keyName: '',
            listCategory: [],
            listSubCategory: [],
            listChildCategory: [],
            selectedCategory: '',
            selectedSubCategory: '',
            selectedChildCategory: '',

            categoryKeyName: '',
            subCategoryKeyName: '',
            childCategoryKeyName: '',

            listProduct: [],
            isLoading: false
        };
    }

    async componentDidMount() {
        let { category, subCategory, childCategory } = this.props.match.params

        await this.props.fetchAllCodesByType('category')

        if (category === 'all-category') {
            this.setState({
                keyName: 'all-category',
                categoryKeyName: 'all-category'
            })
            // await this.props.fetchAllCodesByType('category')
        } else {
            this.setState({
                keyName: category,
                categoryKeyName: category
            })
            await this.props.fetchAllCodesByKeyMap(category)
            await this.props.fetchAllSubCategoryByCategory(category)
        }

        if (subCategory !== undefined || subCategory !== '') {
            this.setState({
                keyName: subCategory,
                subCategoryKeyName: subCategory
            })
        }

        if (childCategory !== undefined || childCategory !== '') {
            this.setState({
                keyName: childCategory,
                childCategoryKeyName: childCategory
            })
        }


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { category, subCategory, childCategory } = this.props.match.params
        if (prevProps.lang !== this.props.lang) {

        }


        if (prevProps.allCodesArr !== this.props.allCodesArr ||
            prevProps.lang !== this.props.lang) {
            let dataCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
            if (this.props.allCodesArr.length === 1) {
                this.setState({
                    selectedCategory: dataCategory[0]
                })
            } else {
                this.setState({
                    listCategory: dataCategory
                })
            }
        }



        if (prevProps.match.params.category !== this.props.match.params.category ||
            prevProps.lang !== this.props.lang) {
            if (this.props.match.params.category === 'all-category') {
                this.setState({
                    keyName: 'all-category',
                    categoryKeyName: 'all-category'
                })
                await this.props.fetchAllProduct()
            } else {
                this.setState({
                    keyName: category,
                    categoryKeyName: category
                })
                await this.props.fetchAllSubCategoryByCategory(category)

            }
        }

        if (prevProps.match.params.subCategory !== this.props.match.params.subCategory ||
            prevProps.lang !== this.props.lang) {
            this.setState({
                keyName: subCategory,
                subCategoryKeyName: subCategory
            })
        }

        if (prevProps.match.params.childCategory !== this.props.match.params.childCategory ||
            prevProps.lang !== this.props.lang) {

            this.setState({
                keyName: childCategory,
                childCategoryKeyName: childCategory
            })

        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr ||
            prevProps.lang !== this.props.lang) {
            let dataSubCategory = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSubCategory,
            })
        }

        if (prevProps.allChildCategoryArr !== this.props.allChildCategoryArr ||
            prevProps.lang !== this.props.lang) {
            let dataChildCategory = this.buildDataInputSelect(this.props.allChildCategoryArr, "childCategory");
            this.setState({
                listChildCategory: dataChildCategory,
            })
        }



        if (prevProps.allProductArr !== this.props.allProductArr ||
            prevProps.lang !== this.props.lang) {
            this.setState({
                listProduct: this.props.allProductArr,

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

                    obj.keyName = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    // obj.subCategories = item.SubCategories;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    // obj.childCategories = item.ChildCategories;
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

    handleOnClickAllCategory = () => {
        if (this.props.history) {
            this.setState({
                keyName: 'all-category',
                categoryKeyName: 'all-category',
                selectedCategory: 'all-category',
                selectedSubCategory: '',
                selectedChildCategory: '',
                listSubCategory: [],
                listChildCategory: [],
            })

            this.props.history.push("/all-category");
        }

    }

    handleOnClickCategory = async (item) => {
        if (item != undefined && this.props.history) {
            this.setState({
                keyName: item.keyName,
                categoryKeyName: item.keyName,
                selectedCategory: item,
                selectedSubCategory: '',
                selectedChildCategory: '',
                // listSubCategory: [],
                listChildCategory: [],
            })

            await this.props.fetchAllProductByCategory(item.keyName)
            // await this.props.fetchAllSubCategoryByCategory(item.keyName)

            this.props.history.push("/" + item.keyName);
        }
    }

    handleOnClickSubCategory = async (item) => {
        let { selectedCategory, categoryKeyName } = this.state
        if (item != undefined && this.props.history) {

            this.setState({
                keyName: item.keyName,
                subCategoryKeyName: item.keyName,
                selectedSubCategory: item,
                selectedChildCategory: '',
                listChildCategory: [],
            })
            await this.props.fetchAllChildCategoryBySubCategory(item.keyName)

            this.props.history.push("/" + categoryKeyName + "/" + item.keyName);
        }
    }

    handleOnClickChildCategory = (item) => {
        let { categoryKeyName, subCategoryKeyName } = this.state
        if (item != undefined && this.props.history) {
            this.setState({
                keyName: item.keyName,
                childCategoryKeyName: item.keyName,
                selectedChildCategory: item,
            })

            this.props.history.push("/" + categoryKeyName + "/" + subCategoryKeyName + "/" + item.keyName);
        }
    }


    setItemsforLocalStorage = () => {
        let { keyName, selectedCategory, selectedSubCategory, selectedChildCategory } = this.state
        localStorage.setItem('keyName', keyName)
        localStorage.setItem('selectedCategoryKeyName', selectedCategory.keyName)
        localStorage.setItem('selectedSubCategoryKeyName', selectedSubCategory.keyName)
        localStorage.setItem('selectedChildCategoryKeyName', selectedChildCategory.keyName)
        // localStorage.setItem('listCategory', JSON.stringify(this.state.listCategory))
        // localStorage.setItem('listSubCategory', JSON.stringify(this.state.listSubCategory))
        // localStorage.setItem('listChildCategory', JSON.stringify(this.state.listChildCategory))
    }

    renderCategoryList = () => {
        let { listCategory, listSubCategory, listChildCategory,
            keyName, categoryKeyName, subCategoryKeyName, childCategoryKeyName,
            selectedCategory, selectedSubCategory, selectedChildCategory } = this.state
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
                        {/* {categoryKeyName === 'all-category' && this.renderMainCategoryList(listCategory)} */}
                        {/* {categoryKeyName === selectedCategory.keyName && this.renderSubCategoryList(listSubCategory)} */}
                        {/* {subCategoryKeyName === selectedSubCategory.keyName && this.renderChildCategoryList(listChildCategory)} */}
                        {/* {subCategoryKeyName === selectedSubCategory.keyName && this.renderChildCategoryList(listChildCategory)} */}

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
        let { keyName, categoryKeyName } = this.state
        return (
            <>
                <ul className='list-category'>
                    {list && list.length > 0 &&
                        list.map((item, index) => (
                            <li key={index}
                                onClick={() => this.handleOnClickCategory(item)}
                                className={item.keyName === keyName ? 'active' : 'hover'}>
                                {item.label}
                            </li>
                        ))

                    }
                </ul>
            </>
        )
    }

    renderSubCategoryList = (list) => {
        let { keyName, selectedCategory, categoryKeyName, subCategoryKeyName } = this.state


        return (
            <>
                <div className={keyName === selectedCategory.keyName ?
                    'list-category active' : 'list-category hover'}>
                    {selectedCategory.label}
                </div>
                <ul className='list-sub-category'>
                    {list && list.length > 0 &&
                        list.map((item, index) => (
                            <li key={index}
                                onClick={() => this.handleOnClickSubCategory(item)}
                                className={item.keyName === keyName ? 'active' : 'hover'}>
                                {item.label}
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }

    renderChildCategoryList = (list) => {
        let { keyName, selectedSubCategory, selectedCategory,
            categoryKeyName, subCategoryKeyName, childCategoryKeyName } = this.state

        return (
            <>
                <div className={keyName === selectedCategory.keyName ?
                    'list-category active' : 'list-category hover'}
                    onClick={() => this.handleOnClickCategory(selectedCategory)}>
                    {selectedCategory.label}
                </div>
                <div className={keyName === selectedSubCategory.keyName ?
                    'list-sub-category active' : 'list-sub-category hover'}>
                    {selectedSubCategory.label}
                </div >
                <ul className='list-child-category'>
                    {list && list.length > 0 &&
                        list.map((item, index) => (
                            <li key={index}
                                onClick={() => this.handleOnClickChildCategory(item)}
                                className={item.keyName === keyName ? 'active' : 'hover'}>
                                {item.label}
                            </li>
                        ))

                    }
                </ul>
            </>
        )
    }

    renderProductList = () => {
        let { listProduct } = this.state

        return (
            <>
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => (
                        <div key={index}
                            className='sharing-product-item-container col-xl-3'>
                            <ProductItem productData={item} />
                        </div>
                    ))
                }
            </>
        )
    }

    render() {
        console.log("Testing props: ", this.props.match.params)
        console.log("Testing state: ", this.state)
        // console.log("Testing listCategory: ", this.state.listCategory)
        // console.log("Testing listSubCategory: ", this.state.listSubCategory)

        let { isLoading } = this.state
        return (
            <React.Fragment>
                <Header />

                <div className='product-list-container'>
                    <div className='row'>
                        <div className='left-menu-content col-xl-3'>
                            <div className='left-content'>
                                {this.renderCategoryList()}
                            </div>
                        </div>
                        <div className='right-list-container col-xl-9'>

                            {/* SORT PRODUCT ACTION */}
                            <div className='sort-actions'>
                                <label>Săp xếp theo:</label>

                                <Select
                                    className={"sort-actions-select"}
                                    // value={selectedCategory}
                                    // onChange={this.handleChangeCategory}
                                    // options={listCategory}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedCategory" />
                            </div>
                            {/* LIST PRODUCT */}
                            {/* <LoadingOverlay
                                active={isLoading}
                                spinner
                                styles={{
                                    spinner: (base) => ({
                                        ...base,
                                        width: '100px',
                                        '& svg circle': {
                                            stroke: 'rgba(255, 0, 0, 0.5)'
                                        }
                                    })
                                }}
                                text='Loading your content...'> */}
                            <div className='container'>
                                <div className='row'>
                                    {this.renderProductList()}
                                </div>
                            </div>
                            {/* </LoadingOverlay> */}
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
        allProductArr: state.admin.allProductArr,
        actionResponse: state.admin.actionResponse,
        selectedCategory: state.admin.selectedCategory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchAllChildCategoryBySubCategory: (subCategory) => dispatch(actions.fetchAllChildCategoryBySubCategory(subCategory)),
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),
        fetchAllCodesByKeyMap: (inputKeyMap) => dispatch(actions.fetchAllCodesByKeyMap(inputKeyMap)),
        fetchAllProductByCategory: (inputCategory) => dispatch(actions.fetchAllProductByCategory(inputCategory)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
