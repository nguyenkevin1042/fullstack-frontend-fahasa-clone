import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './DropdownMenu.scss';
import { languages } from '../../../../utils'

import * as actions from "../../../../store/actions";

class DropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            selectedCategory: '',
            listSubCategory: [],
            selectedChildCategory: [],
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('category')
        let dataSelectCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
        this.setState({
            listCategory: dataSelectCategory,
            selectedCategory: dataSelectCategory[0],

        })

        await this.props.fetchAllSubCategoryByCategory(dataSelectCategory[0].keyName);
        let dataSelectSubCategory = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
        this.setState({
            listSubCategory: dataSelectSubCategory,
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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

    hanldeRedirectToSubCategoryProductList = (event, item) => {
        let { selectedCategory } = this.state
        event.preventDefault();
        if (this.props.history) {
            this.props.history.push("/" + selectedCategory.keyName + "/" + item.keyName);
        }
    }

    hanldeRedirectToChildCategoryProductList = (event, subCategoryItem, item) => {
        let { selectedCategory } = this.state
        event.preventDefault();
        if (this.props.history) {
            this.props.history.push("/" + selectedCategory.keyName
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
                            key={index}>
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
                                <div className='sub-category-item col-md-3' key={index}>
                                    <div className='sub-category-title'
                                        onClick={(event) => this.hanldeRedirectToSubCategoryProductList(event, subCategoryItem)}>
                                        {subCategoryItem.label}
                                    </div>
                                    <div>
                                        <ul className='child-category-list'>
                                            {subCategoryItem.childCategoryData && subCategoryItem.childCategoryData.length > 0 &&
                                                subCategoryItem.childCategoryData.map((item, index) => (
                                                    <li key={index} className='child-category-item'
                                                        onClick={(event) => this.hanldeRedirectToChildCategoryProductList(event, subCategoryItem, item)}>
                                                        {language === languages.VI ? item.valueVI : item.valueEN}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className='view-all-child-category'>
                                        {subCategoryItem.childCategoryData && subCategoryItem.childCategoryData.length > 0 ?
                                            <p onClick={(event) => this.hanldeRedirectToSubCategoryProductList(event, subCategoryItem)}>
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
        return (
            <div className='dropdown-menu-container'>
                <div className='row'>
                    <div className='left-menu col-xl-3'>
                        <div className='left-menu-title'>
                            <FormattedMessage id="customer.homepage.header.menu.title" />
                        </div>
                        <div className='left-menu-list-category'>
                            {this.renderCategoryList()}
                        </div>
                    </div>
                    <div className='right-menu col-xl-9'>
                        {this.renderSubCategoryList()}
                    </div>
                </div>
            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllCodesById: (categoryId) => dispatch(actions.fetchAllCodesById(categoryId)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchChildCategoryByKeyName: (keyName) => dispatch(actions.fetchChildCategoryByKeyName(keyName)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropdownMenu));
