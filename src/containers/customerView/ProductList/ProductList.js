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
            keyName: 'all',
            listCategory: [],
            listSubCategory: [],
            listChildCategory: [],
            selectedCategory: '',
            selectedSubCategory: '',
            selectedChildCategory: '',

            listProduct: [],
            isLoading: false
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('category')

        let dataSelectCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
        this.setState({
            listCategory: dataSelectCategory,
        })

        if (this.props.match.params.keyName === 'all') {
            await this.props.fetchAllProduct()
        } else {

            this.setState({
                keyName: localStorage.getItem('keyName'),
                listCategory: JSON.parse(localStorage.getItem('listCategory')),
                listSubCategory: JSON.parse(localStorage.getItem('listSubCategory')),
                listChildCategory: JSON.parse(localStorage.getItem('listChildCategory')),
                selectedCategory: JSON.parse(localStorage.getItem('selectedCategory')),
                selectedSubCategory: JSON.parse(localStorage.getItem('selectedSubCategory')),
                selectedChildCategory: JSON.parse(localStorage.getItem('selectedChildCategory')),
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr ||
            prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
            })
        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr ||
            prevProps.lang !== this.props.lang) {
            let dataSelectSubCategory = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSelectSubCategory,
            })
        }

        if (prevProps.match.params.keyName !== this.props.match.params.keyName ||
            prevProps.lang !== this.props.lang) {
            if (this.props.match.params.keyName === 'all') {
                this.setState({
                    keyName: 'all'
                })
                await this.props.fetchAllProduct()
            } else {
                this.setState({
                    keyName: this.props.match.params.keyName
                })
            }
            this.setItemsforLocalStorage()
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
                    obj.subCategories = item.SubCategories;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.childCategories = item.ChildCategories;
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
                keyName: 'all',
                selectedCategory: '',
                selectedSubCategory: '',
                selectedChildCategory: '',
                listSubCategory: []
            })

            this.props.history.push("/category/all");
        }

    }

    handleOnClickCategory = (item) => {
        if (item != undefined && this.props.history) {
            let dataSubCategory = this.buildDataInputSelect(item.subCategories, "subCategory");

            this.setState({
                keyName: item.keyName,
                selectedCategory: item,
                selectedSubCategory: '',
                selectedChildCategory: '',
                listSubCategory: dataSubCategory,
            })
            this.props.history.push("/category/" + item.keyName);
        }
    }

    handleOnClickSubCategory = (item) => {
        if (item != undefined && this.props.history) {
            let dataChildCategory = this.buildDataInputSelect(item.childCategories, "childCategory");

            this.setState({
                keyName: item.keyName,
                selectedSubCategory: item,
                selectedChildCategory: '',
                listChildCategory: dataChildCategory,
            })

            this.props.history.push("/category/" + item.keyName);
        }
    }

    handleOnClickChildCategory = (item) => {
        if (item != undefined && this.props.history) {
            this.setState({
                keyName: item.keyName,
                selectedChildCategory: item,
            })

            this.props.history.push("/category/" + item.keyName);
        }
    }


    setItemsforLocalStorage = () => {
        localStorage.setItem('keyName', this.state.keyName)
        localStorage.setItem('selectedCategory', JSON.stringify(this.state.selectedCategory))
        localStorage.setItem('selectedSubCategory', JSON.stringify(this.state.selectedSubCategory))
        localStorage.setItem('selectedChildCategory', JSON.stringify(this.state.selectedChildCategory))
        localStorage.setItem('listCategory', JSON.stringify(this.state.listCategory))
        localStorage.setItem('listSubCategory', JSON.stringify(this.state.listSubCategory))
        localStorage.setItem('listChildCategory', JSON.stringify(this.state.listChildCategory))
    }

    renderCategoryList = () => {
        let { listCategory, listSubCategory, listChildCategory, keyName, selectedCategory, selectedSubCategory, selectedChildCategory } = this.state
        return (
            <div className='sharing-menu'>
                <div className='sharing-title'>
                    <FormattedMessage id="customer.product-list.category.title" />
                </div>

                <div className='sharing-list-category'>
                    <div className={keyName === 'all' ?
                        'all-category-text active' : 'all-category-text hover'}
                        onClick={() => this.handleOnClickAllCategory()}>
                        <FormattedMessage id="customer.product-list.category.all-category" />
                    </div>

                    <div className='list-all-category'>
                        {keyName === 'all' && this.renderMainCategoryList(listCategory)}
                        {keyName === selectedCategory.keyName && this.renderSubCategoryList(listSubCategory)}
                        {keyName === selectedSubCategory.keyName && this.renderChildCategoryList(listChildCategory)}
                        {keyName === selectedChildCategory.keyName && this.renderChildCategoryList(listChildCategory)} </div>
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
        let { keyName, selectedCategory } = this.state

        return (
            <>
                <div className={keyName === selectedCategory.keyName ?
                    'list-category active' : 'list-category hover'}
                    onClick={() => this.handleOnClickCategory()}>
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
        let { keyName, selectedSubCategory, selectedCategory } = this.state
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

    renderAProduct = () => {
        return (
            <div className='sharing-product-item' title='Shaman King - Tập 30 - Bìa Đôi'>
                <div className='sharing-product-item-image sold'>
                    <div className='discount'>50%</div>
                </div>
                <div className='sharing-product-item-text'>
                    <div className='item-name'>
                        Shaman King - Tập 30 - Bìa Đôi
                    </div>
                    <div className='item-price-chapter'>
                        <div className='item-discount-price'>
                            17.500
                        </div>
                        <div className='item-price'>
                            35.000
                        </div>
                        <div className='item-chapter'>
                            Tập 30
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    renderProductList = () => {
        let { listProduct } = this.state

        return (
            <>
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => (
                        <div className='sharing-product-item-container col-xl-3'>
                            <ProductItem productData={item} />
                        </div>
                    ))
                }
            </>
        )
    }

    render() {

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
                            <div className='container'>
                                <div className='row'>
                                    {this.renderProductList()}
                                </div>
                            </div>
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
        allProductArr: state.admin.allProductArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
