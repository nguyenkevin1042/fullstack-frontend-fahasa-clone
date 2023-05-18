import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { languages } from '../../../utils'
import viFlag from '../../../assets/vietnamese.svg';
import enFlag from '../../../assets/english.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLanguage: [
                {
                    value: 'vi', label: (
                        <>
                            <img src={viFlag}
                                className='language-icon'
                                alt="Vietnamese Logo" /> VI
                        </>
                    )
                },
                {
                    value: 'en', label: (
                        <>
                            <img src={enFlag}
                                className='language-icon'
                                alt="English Logo" /> EN
                        </>
                    )
                }
            ],
            selectedLanguage: ''
        };
    }

    componentDidMount() {
        this.setState({
            selectedLanguage: this.state.listLanguage[0]
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }



    handleChangeLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage: selectedLanguage
        })

        this.props.changeLanguageApp(selectedLanguage.value);
    }

    render() {
        let { listLanguage, selectedLanguage } = this.state
        let language = this.props.lang
        let customStyles = {
            control: (baseStyles, state) => ({
                ...baseStyles,
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
                padding: 8,
                cursor: "pointer"
            })
        };

        return (
            <div className='home-header-container'>
                <div className='row'>

                    <div className='home-header-logo-menu col-md-3 col-12'>
                        <div className='home-header-logo'>

                        </div >

                        <div className='home-header-menu'>
                            <div className='home-header-menu-toggle'>
                                <div className='home-header-menu-toggle-icon'></div>

                                <i className="fa fa-angle-down"></i>
                            </div>
                        </div >
                    </div >

                    <div className='home-header-search-bar col-md-6'>
                        <input type='text' className='form-control search-bar'
                            placeholder={
                                language === languages.VI ?
                                    "Tìm kiếm sản phẩm mong muốn" :
                                    "Search entire store here"
                            } />
                        <button><i className="fa fa-search"></i></button>
                    </div >

                    <div className='home-header-user-options col-md-3'>
                        <div className='container'>
                            <div className='row'>
                                <div className='user-options-notifications option col-3'>
                                    <i className="fa fa-bell"></i>
                                    <p>
                                        <FormattedMessage id="customer.homepage.header.notifications" />
                                    </p>
                                </div>

                                <div className='user-options-cart option col-3'>
                                    <i className="fa fa-shopping-cart"></i>
                                    <p><FormattedMessage id="customer.homepage.header.cart" /></p>
                                </div>

                                <div className='user-options-information option col-3'>
                                    <i className="fa fa-user"></i>
                                    <p><FormattedMessage id="customer.homepage.header.account" /></p>
                                </div>

                                <div className='user-options-change-language option col-3'>
                                    <Select
                                        styles={customStyles}
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

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
