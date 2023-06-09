import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import './Header.scss';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { languages } from '../../../utils'
import viFlag from '../../../assets/vietnamese.svg';
import enFlag from '../../../assets/english.svg';


import DropdownMenu from './DropdownComponents/DropdownMenu';
import { Dropdown } from 'antd';
import DropdownAccount from './DropdownComponents/DropdownAccount';
import SearchDropdown from './DropdownComponents/SearchDropdown';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLanguage: [
                {
                    value: 'vi', label: (
                        <div className='langugage-option'>
                            <img src={viFlag}
                                className='language-icon img-fluid'
                                alt="Vietnamese Logo" />
                            <span>VI</span>
                        </div>
                    )
                },
                {
                    value: 'en', label: (
                        <div className='langugage-option'>
                            <img src={enFlag}
                                className='language-icon img-fluid'
                                alt="English Logo" />
                            <span>EN</span>
                        </div>
                    )
                }
            ],
            selectedLanguage: '',
            hoverMenu: false,
            isOpened: true,

            productsInCartLength: '',
            searchQuery: ''
        };
    }

    async componentDidMount() {
        if (this.props.userInfo) {
            await this.props.getCartByUserId(this.props.userInfo.id)
            this.setState({
                productInCartLength: this.props.cartData.length
            })
        } else {
            this.setState({
                productInCartLength: ''
            })
        }

        this.setState({
            selectedLanguage: this.state.listLanguage[0]
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.cartData !== this.props.cartData) {
            this.setState({
                productInCartLength: this.props.cartData.length
            })
        }

        // if (prevProps.userInfo !== this.props.userInfo) {
        //     if (this.props.userInfo) {
        //         await this.props.getCartByUserId(this.props.userInfo.id)
        //     } else {
        //         this.setState({
        //             productInCartLength: ''
        //         })
        //     }
        // }
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

                    obj.key = item.id;
                    obj.category = item.keyMap;
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

    handleSearchProduct = () => {
        let { searchQuery } = this.state
        if (this.props.history) {
            this.props.history.push({
                pathname: '/search-result',
                state: searchQuery,
                search: '?' + new URLSearchParams({ query: searchQuery }).toString()
            })
        }
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSearchProduct();
        }
    }

    handleChangeLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage: selectedLanguage
        })

        this.props.changeLanguageApp(selectedLanguage.value);
    }

    handleRedirectToLoginPage = () => {
        if (this.props.history) {
            this.props.history.push("/customer/account/login");
        }
    }

    handleRedirectToAccountPage = () => {
        if (this.props.userInfo) {
            this.props.history.push("/customer/account/dashboard");
        }
    }

    handleToHomepage = () => {
        if (this.props.history) {
            this.props.history.push("/home");
        }
    }

    hanldeRedirectToAllCategoryProductList = () => {
        if (this.props.history) {
            this.props.history.push("/category/all-category");
        }
    }

    handleRedirectToCart = () => {
        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }

    renderCustomerOption = () => {
        const accountMenu = (<DropdownAccount />);
        let { userInfo, lang } = this.props
        let firstName = userInfo && userInfo.firstName !== null ? userInfo.firstName : ''
        let lastName = userInfo && userInfo.lastName !== null ? userInfo.lastName : ''

        return (

            <Dropdown overlay={accountMenu}>
                <div className='user-options-information option col-6 col-md-3'
                    onClick={userInfo ? this.handleRedirectToAccountPage : this.handleRedirectToLoginPage}>
                    <i className="fa fa-user"></i>
                    {userInfo ?
                        <>
                            {lang === languages.VI ?
                                <p className='customer-name'>
                                    {firstName} {lastName}
                                </p> :
                                <p className='customer-name'>
                                    {lastName} {firstName}
                                </p>
                            }
                        </>
                        :
                        <p><FormattedMessage id="customer.homepage.header.account.title" /></p>
                    }


                </div>
            </Dropdown>
        )
    }


    render() {
        let { listLanguage, selectedLanguage, productInCartLength, isOpened } = this.state
        let language = this.props.lang

        const menu = (<DropdownMenu />);
        return (
            <>
                <div className='home-header-container '>
                    <div className='container-fluid'>
                        <div className='home-header-content row'>
                            {/* LOGO */}
                            <div className='home-header-logo col-12 col-md-12 col-lg-2'
                                onClick={() => this.handleToHomepage()}>

                            </div >
                            {/* MENU */}
                            <div className='home-header-menu col-1 col-md-1 col-lg-1 px-1'>
                                <Dropdown overlay={menu}>
                                    <div className='home-header-menu-toggle'
                                        onClick={() => this.hanldeRedirectToAllCategoryProductList()}>
                                        <div className='home-header-menu-toggle-icon img-fluid'></div>
                                        <div><i className="fa fa-angle-down"></i></div>
                                    </div>
                                </Dropdown>
                            </div >
                            {/* SEARCH BAR */}
                            <div className='home-header-search-bar col-9 col-md-9 col-lg-6'>
                                <input type='text'
                                    id='searchQuery'
                                    onChange={(event) => this.hanleOnChangeInput(event)}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                    className='form-control search-bar'
                                    placeholder={
                                        language === languages.VI ?
                                            "Tìm kiếm sản phẩm mong muốn" :
                                            "Search entire store here"
                                    } />
                                <button onClick={() => this.handleSearchProduct()}><i className="fa fa-search"></i></button>
                            </div >
                            {/* OPTIONS */}
                            <div className='home-header-user-options col-2 col-md-2 col-lg-3'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='user-options-notifications option col-md-3'>
                                            <i className="fa fa-bell"></i>
                                            <p>
                                                <FormattedMessage id="customer.homepage.header.notifications" />
                                            </p>
                                        </div>

                                        <div className='user-options-cart option col-6 col-md-3'
                                            onClick={() => this.handleRedirectToCart()}>
                                            <i className="fa fa-shopping-cart"></i>
                                            <p><FormattedMessage id="customer.homepage.header.cart" /></p>
                                            {productInCartLength > 0 ?
                                                <span className='sum-products-in-cart'>{productInCartLength}</span> : <></>}
                                        </div>

                                        {this.renderCustomerOption()}

                                        <div className='user-options-change-language option col-md-3'>
                                            <Select
                                                className={'select-language-option'}
                                                classNamePrefix="react-select"
                                                value={selectedLanguage}
                                                onChange={this.handleChangeLanguage}
                                                options={listLanguage}
                                                name="selectedLanguage" />
                                        </div>
                                    </div>
                                </div >
                            </div>
                        </div>
                    </div >
                </div >
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        allCodesArr: state.admin.allCodesArr,
        cartData: state.user.cartData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),
        getProductByName: (inputName) => dispatch(actions.getProductByName(inputName)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
