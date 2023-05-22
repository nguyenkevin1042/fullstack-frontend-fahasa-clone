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
            selectedCategory: ''
        };
    }

    componentDidMount() {
        this.setState({
            selectedCategory: this.props.listCategory[0]
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        // if (prevProps.allCodesArr !== this.props.allCodesArr) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
        //     this.setState({
        //         listCategory: dataSelect
        //     })
        // }

    }

    handleOnMouseOver = (category) => {
        this.setState({
            selectedCategory: category
        })
    }


    renderCategotyList = () => {
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
        let { selectedCategory } = this.state
        return (
            <>
                {selectedCategory.label}
            </>
        )
    }

    render() {
        return (
            <div className='dropdown-menu-container container'>
                <div className='row'>
                    <div className='left-menu col-xl-3'>
                        <div className='left-menu-title'>
                            Danh mục sản phẩm
                        </div>
                        <div className='left-menu-list-category'>
                            {this.renderCategotyList()}
                        </div>
                    </div>
                    <div className='right-menu col-xl-9'>
                        {this.renderSubCategoryList(0)}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
