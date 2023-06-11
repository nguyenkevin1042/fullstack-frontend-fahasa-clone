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
                                className='language-icon'
                                alt="Vietnamese Logo" />
                            <span>VI</span>
                        </div>
                    )
                },
                {
                    value: 'en', label: (
                        <div className='langugage-option'>
                            <img src={enFlag}
                                className='language-icon '
                                alt="English Logo" />
                            <span>EN</span>
                        </div>
                    )
                }
            ],
            selectedLanguage: '',
            hoverMenu: false,
            listCategory: [],
            selectedCategory: '',
            visible: false,

            productName: ''
        };
    }

    async componentDidMount() {
        // await this.props.fetchAllCodesByType('category')
        this.setState({
            selectedLanguage: this.state.listLanguage[0]
        })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr
            || prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
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

                    obj.key = item.id;
                    obj.category = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
        }

        return result;
    }

    handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
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
        if (this.props.history) {
            this.props.history.push("/customer/account");
        }
    }

    handleToHomepage = () => {
        if (this.props.history) {
            this.props.history.push("/home");
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

        return (

            <Dropdown overlay={accountMenu}>
                <div className='user-options-information option col-6 col-md-3'
                    onClick={userInfo ? this.handleRedirectToAccountPage : this.handleRedirectToLoginPage}
                >
                    <i className="fa fa-user"></i>
                    {userInfo ?
                        <>
                            {lang === languages.VI ?
                                <p className='customer-name'>
                                    {userInfo.firstName} {userInfo.lastName}
                                </p> :
                                <p className='customer-name'>
                                    {userInfo.lastName} {userInfo.firstName}
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
        let { listLanguage, selectedLanguage } = this.state
        let language = this.props.lang
        let customStyles = {
            control: (baseStyles, state) => ({
                ...baseStyles,
                width: 75,
                borderRadius: 8,
                boxShadow: "none",
                cursor: "pointer",
                "&:hover": {
                    borderColor: state.isFocused ? "none" : "none"
                }
            }),
            dropdownIndicator: base => ({
                ...base,
                padding: 0,

            }),
            option: (baseStyles, state) => ({
                ...baseStyles,
                padding: 0,
                paddingTop: 10,
                borderRadius: 8,
                width: 80,
                cursor: "pointer"
            }),
            menu: (baseStyles, state) => ({
                ...baseStyles,
                padding: 10,
                // margin: 'auto',
                width: 100,
                right: 5,
                borderRadius: 8,
                cursor: "pointer"
            })
        };

        const menu = (<DropdownMenu />);
        const searchDropdown = (<SearchDropdown />)
        return (
            <>
                <div className='home-header-container container-fluid'>
                    {/* <div className='home-header-container container'> */}
                    <div className='home-header-content row'>
                        {/* LOGO */}
                        <div className='home-header-logo col-12 col-lg-2'
                            onClick={() => this.handleToHomepage()}>

                        </div >
                        {/* MENU */}
                        <div className='home-header-menu col-1 col-lg-1 px-1'>
                            <Dropdown overlay={menu}>
                                <div className='home-header-menu-toggle'>
                                    <div className='home-header-menu-toggle-icon img-fluid'></div>
                                    <div><i className="fa fa-angle-down"></i></div>
                                </div>
                            </Dropdown>
                        </div >
                        {/* SEARCH BAR */}
                        <div className='home-header-search-bar col-8 col-md-9 col-lg-5'>
                            {/* <Dropdown overlay={searchDropdown}> */}
                            <input type='text'
                                id='productName'
                                onChange={(event) => this.handleOnChangeInput(event)}
                                className='form-control search-bar'
                                placeholder={
                                    language === languages.VI ?
                                        "Tìm kiếm sản phẩm mong muốn" :
                                        "Search entire store here"
                                } />
                            <button><i className="fa fa-search"></i></button>
                            {/* </Dropdown> */}
                        </div >
                        {/* OPTIONS */}
                        <div className='home-header-user-options col-3 col-md-2 col-lg-4'>
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
                                    </div>

                                    {this.renderCustomerOption()}


                                    <div className='user-options-change-language option col-md-3'>
                                        <Select
                                            className={'select-language-option'}
                                            // styles={customStyles}
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


            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        allCodesArr: state.admin.allCodesArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
