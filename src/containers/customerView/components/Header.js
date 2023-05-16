import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import * as actions from "../../../store/actions";
import Select from 'react-select';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLanguage: [
                { value: 'vi', label: 'VI' },
                { value: 'en', label: 'EN' }
            ],
            selectedLanguage: 'vi'
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    handleChange = (selectedLanguage) => {
        this.setState({
            selectedLanguage: selectedLanguage
        })
    }


    render() {
        let { listLanguage, selectedLanguage } = this.state

        return (
            <div className='home-header-container'>
                <div className='home-header-logo'>

                </div >

                <div className='home-header-menu'>
                    <div className='home-header-menu-toggle'>
                        <div className='home-header-menu-toggle-icon'></div>
                        <i className="fa fa-angle-down"></i>
                    </div>
                </div >

                <div className='home-header-search-bar'>
                    <input type='text' className='form-control search-bar' />
                    <button><i className="fa fa-search"></i></button>
                </div >

                <div className='home-header-user-options'>
                    <div className='user-options-notifications option'>
                        <i className="fa fa-bell"></i>
                        <p>Notifications</p>
                    </div>

                    <div className='user-options-cart option'>
                        <i className="fa fa-shopping-cart"></i>
                        <p>My cart</p>
                    </div>

                    <div className='user-options-information option'>
                        <i className="fa fa-user"></i>
                        <p>Account</p>
                    </div>

                    <div className='user-options-change-language option'>
                        <Select
                            value={selectedLanguage}
                            onChange={this.handleChange}
                            options={listLanguage}
                            defaultValue={{ value: 'vi', label: 'VI' }}
                            name="selectedLanguage" />
                    </div>
                </div >


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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
