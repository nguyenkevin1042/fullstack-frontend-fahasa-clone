import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './DropdownMenu.scss';
import { languages } from '../../../../utils'

import * as actions from "../../../../store/actions";
import LoadingOverlay from 'react-loading-overlay';

class DropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            selectedCategory: '',
            listSubCategory: [],
            selectedChildCategory: [],
            isLoading: false,

        };
    }

    async componentDidMount() {
        this.setState({
            listCategory: [],
            selectedCategory: '',
            listSubCategory: [],
            selectedChildCategory: [],
        })
        await this.props.fetchAllCodesByType('category')
        let dataSelectCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
        this.setState({
            listCategory: dataSelectCategory,
            selectedCategory: dataSelectCategory[0],

        })

        await this.props.fetchAllSubCategoryByCategory(this.state.selectedCategory.keyName);
        let dataSelectSubCategory = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
        this.setState({
            listSubCategory: dataSelectSubCategory,
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
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

        if (prevProps.childCategory !== this.props.childCategory ||
            prevProps.lang !== this.props.lang) {
            this.setState({
                selectedChildCategory: this.props.childCategory[0],
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

                    obj.id = item.id
                    obj.keyName = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.id = item.id
                    obj.keyName = item.keyName;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    obj.childCategoryData = item.ChildCategories
                    result.push(obj);
                });
            }
        }

        return result;
    }

    handleOnMouseOver = async (hoveredCategory) => {
        await this.props.fetchAllSubCategoryByCategory(hoveredCategory.keyName);
        this.setState({
            selectedCategory: hoveredCategory,
        })
    }

    hanldeRedirectToCategoryProductList = (item) => {
        if (this.props.history) {
            this.props.history.push("/category/" + item.keyName);
        }
    }

    hanldeRedirectToSubCategoryProductList = (item) => {
        let { selectedCategory } = this.state
        if (this.props.history) {
            this.props.history.push("/category/" + selectedCategory.keyName + "/" + item.keyName);
        }
    }

    hanldeRedirectToChildCategoryProductList = (subCategoryItem, item) => {
        let { selectedCategory } = this.state
        if (this.props.history) {
            this.props.history.push("/category/" + selectedCategory.keyName
                + "/" + subCategoryItem.keyName + "/" + item.keyName);
        }
    }


    renderCategoryList = () => {
        let { listCategory } = this.state;
        return (
            <>
                {listCategory && listCategory.length > 0 &&
                    listCategory.map((item, index) => (
                        <div className='left-menu-category-item'
                            onMouseOver={() => this.handleOnMouseOver(item)}
                            onClick={() => this.hanldeRedirectToCategoryProductList(item)}
                            key={item.id}>
                            {item.label}
                        </div>
                    ))
                }
            </>
        )
    }

    renderSubCategoryList = () => {
        let { selectedCategory, listSubCategory } = this.state
        let language = this.props.lang;

        return (
            <>
                <div className='right-menu-title'>
                    {selectedCategory.label}
                </div>
                <div className='right-menu-sub-category'>
                    <div className='row'>
                        {listSubCategory && listSubCategory.length > 0 &&
                            listSubCategory.map((subCategoryItem, index) => (
                                <div className='sub-category-item col-md-3' key={subCategoryItem.id}>
                                    <div className='sub-category-title'
                                        onClick={() => this.hanldeRedirectToSubCategoryProductList(subCategoryItem)}>
                                        {subCategoryItem.label}
                                    </div>
                                    <div>
                                        <ul className='child-category-list'>
                                            {subCategoryItem.childCategoryData && subCategoryItem.childCategoryData.length > 0 &&
                                                subCategoryItem.childCategoryData.map((item, index) => (
                                                    <li key={item.id} className='child-category-item'
                                                        onClick={() => this.hanldeRedirectToChildCategoryProductList(subCategoryItem, item)}>
                                                        {language === languages.VI ? item.valueVI : item.valueEN}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className='view-all-child-category'>
                                        {subCategoryItem.childCategoryData && subCategoryItem.childCategoryData.length > 0 ?
                                            <p onClick={() => this.hanldeRedirectToSubCategoryProductList(subCategoryItem)}>
                                                <FormattedMessage id="customer.homepage.header.menu.all-child-category" />
                                            </p> :
                                            <></>
                                        }
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </>
        )
    }

    render() {
        let { isLoading } = this.state
        return (
            // <LoadingOverlay
            //     classNamePrefix='Fullscreen_'
            //     active={isLoading}
            //     spinner={true}
            //     text='Please wait...'>
            < div className='dropdown-menu-container d-none d-lg-block' >
                <div className='row'>
                    <div className='left-menu col-md-3'>
                        <div className='left-menu-title'>
                            <FormattedMessage id="customer.homepage.header.menu.title" />
                        </div>
                        <div className='left-menu-list-category'>
                            {this.renderCategoryList()}
                        </div>
                    </div>
                    <div className='right-menu col-md-9'>
                        {this.renderSubCategoryList()}
                    </div>
                </div>
            </div >

            // </LoadingOverlay>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allChildCategoryArr: state.admin.allChildCategoryArr,
        childCategory: state.admin.childCategory,
        isFetchingData: state.admin.isFetchingData,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        // fetchChildCategoryByKeyName: (keyName) => dispatch(actions.fetchChildCategoryByKeyName(keyName)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropdownMenu));
