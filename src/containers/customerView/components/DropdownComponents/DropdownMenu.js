import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DropdownMenu.scss';
import { languages } from '../../../../utils'
import { Menu, Dropdown, Icon } from 'antd';

import * as actions from "../../../../store/actions";

class DropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            selectedCategory: '',
            listSubCategory: [],
        };
    }

    async componentDidMount() {
        this.setState({
            listCategory: this.props.listCategory,
            selectedCategory: this.props.listCategory[0],
        })
        await this.props.fetchAllSubCategoryByCategoryType(this.props.listCategory[0].categoryType);
        this.setState({
            listSubCategory: this.props.allSubCategoryArr,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
            this.setState({
                listSubCategory: this.props.allSubCategoryArr
            })
        }
    }

    handleOnMouseOver = async (category) => {
        await this.props.fetchAllSubCategoryByCategoryType(category.categoryType);
        this.setState({
            selectedCategory: category,
        })
    }


    renderCategoryList = () => {
        let { listCategory } = this.props;

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
                            listSubCategory.map((item, index) => (
                                <div className='sub-category-item col-md-3' key={index}>
                                    <div className='sub-category-title'>
                                        {language === languages.VI ? item.valueVI : item.valueEN}
                                    </div>
                                    <div>
                                        <ul className='child-category-list'>
                                            {this.renderChildCategoryList(item.childCategoryData)}
                                        </ul>

                                    </div>
                                </div>
                            ))

                        }

                    </div>
                </div>

            </>
        )
    }

    renderChildCategoryList = (childCategoryData) => {
        let language = this.props.lang;
        return (
            <>
                {childCategoryData && childCategoryData.length > 0 &&
                    childCategoryData.map((item, index) => (
                        <li key={index} className='child-category-item'>
                            {language === languages.VI ? item.valueVI : item.valueEN}
                        </li>
                    ))
                }
                {childCategoryData && childCategoryData.length > 0 ?
                    <li className='view-all-child-category'>
                        <FormattedMessage id="customer.homepage.header.menu.all-child-category" />
                    </li> :
                    <></>
                }
                {/* <li className='view-all-child-category'>
                    <FormattedMessage id="customer.homepage.header.menu.all-child-category" />
                </li> */}
            </>
        )
    }


    render() {
        return (
            <div className='dropdown-menu-container container'>
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



            // <Menu className='dropdown-menu-container'>
            //     <Menu.Item className='item'>1st menu item</Menu.Item>
            //     <Menu.Item>2nd menu item</Menu.Item>
            // <SubMenu title="sub menu">
            //     <Menu.Item>3rd menu item</Menu.Item>
            //     <Menu.Item>4th menu item</Menu.Item>
            // </SubMenu>
            //     <SubMenu title="disabled sub menu" disabled>
            //         <Menu.Item>5d menu item</Menu.Item>
            //         <Menu.Item>6th menu item</Menu.Item>
            //     </SubMenu>
            // </Menu>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allChildCategoryArr: state.admin.allChildCategoryArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesById: (categoryId) => dispatch(actions.fetchAllCodesById(categoryId)),
        fetchAllSubCategoryByCategoryType: (categoryType) => dispatch(actions.fetchAllSubCategoryByCategoryType(categoryType)),
        fetchAllChildCategoryById: (subCatId) => dispatch(actions.fetchAllChildCategoryById(subCatId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
