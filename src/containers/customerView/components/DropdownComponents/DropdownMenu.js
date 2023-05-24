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
            listChildCategory: []
        };
    }

    async componentDidMount() {
        this.setState({
            listCategory: this.props.listCategory,
            selectedCategory: this.props.listCategory[0],
        })
        await this.props.fetchAllSubCategoryByCategoryType(this.props.listCategory[0].categoryType);
        await this.props.fetchAllChildCategoryById(1);
        this.setState({
            listSubCategory: this.props.allSubCategoryArr,
            listChildCategory: this.props.allChildCategoryArr
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
        if (prevProps.allChildCategoryArr !== this.props.allChildCategoryArr) {
            this.setState({
                listChildCategory: this.props.allChildCategoryArr
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

        return (

            <>
                <div className='right-menu-title'>
                    {selectedCategory.label}
                </div>
                <div className='right-menu-sub-category'>
                    {/* {this.renderChildCategotyList()} */}
                    {/* <div className='sub-category-item'> */}
                    <div className='row'>
                        {listSubCategory && listSubCategory.length > 0 &&
                            listSubCategory.map((item, index) => (
                                <div className='sub-category-item col-md-3' key={index}>
                                    <div className='sub-category-title'>{item.valueVI}</div>
                                    <ul>
                                        {this.renderChildCategoryList(item.id)}
                                    </ul>
                                </div>
                            ))

                        }

                    </div>
                </div>

            </>
        )
    }

    renderChildCategoryList = (subCatId) => {
        // await this.props.fetchAllChildCategoryById(subCatId);
        let { allChildCategoryArr } = this.props;
        console.log("renderChildCategoryList: ", subCatId)
        // console.log("allChildCategoryArr: ", allChildCategoryArr)
        return (
            <>
                {subCatId} subCatId
                {/* <li>Child Item 1</li>
                <li>Child Item 2</li>
                <li>Child Item 3</li>
                <li>Child Item 4</li>
                <li>Child Item 5</li>
                <li>Child Item 6</li> */}
                {/* {allChildCategoryArr && allChildCategoryArr.length > 0 &&
                    allChildCategoryArr.map((item, index) => (
                        // <li key={index}>{item.valueVI}</li>
                        // <li key={index}>Child Item 6</li>
                        <></>
                    ))
                } */}
            </>
        )
    }


    render() {
        console.log(this.props.allChildCategoryArr)
        console.log(this.state)

        return (
            <div className='dropdown-menu-container container'>
                <div className='row'>
                    <div className='left-menu col-xl-3'>
                        <div className='left-menu-title'>
                            Danh mục sản phẩm
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
