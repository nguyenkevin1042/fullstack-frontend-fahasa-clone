import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Login.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import * as actions from "../../../store/actions";
import ChangingPasswordSuccessComponent from './ChangingPasswordSuccessComponent';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadSignInForm: true,
            loadSignUpForm: false,
            loadForgotPasswordForm: false,
            loadChangingPasswordSuccess: false,
        };
    }

    componentDidMount() {
        if (this.state.loadSignInForm === true) {
            document.title = "Sign in | Nguyenkevin1042's Fahasa Clone"
        }
        if (this.state.loadSignUpForm === true) {
            document.title = "Sign up | Nguyenkevin1042's Fahasa Clone"
        }
        if (this.state.loadForgotPasswordForm === true) {
            document.title = "Forgot your password | Nguyenkevin1042's Fahasa Clone"
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState.loadSignInForm !== this.state.loadSignInForm) {
            if (this.state.loadSignInForm === true) {
                document.title = "Sign in | Nguyenkevin1042's Fahasa Clone"
            }
        }
        if (prevState.loadSignUpForm !== this.state.loadSignUpForm) {
            if (this.state.loadSignUpForm === true) {
                document.title = "Sign up | Nguyenkevin1042's Fahasa Clone"
            }
        }
        if (prevState.loadForgotPasswordForm !== this.state.loadForgotPasswordForm) {
            if (this.state.loadForgotPasswordForm === true) {
                document.title = "Forgot your password | Nguyenkevin1042's Fahasa Clone"
            }
        }

    }

    handleOpenSignInForm = () => {
        this.setState({
            loadSignInForm: true,
            loadSignUpForm: false,
            loadForgotPasswordForm: false
        })
    }

    handleOpenSignUpForm = () => {
        this.setState({
            loadSignInForm: false,
            loadSignUpForm: true,
            loadForgotPasswordForm: false,
            loadChangingPasswordSuccess: false,
        })
    }

    handleOpenForgotPasswordForm = () => {
        this.setState({
            loadSignInForm: false,
            loadSignUpForm: false,
            loadForgotPasswordForm: true,
            loadChangingPasswordSuccess: false,
        })
    }

    handleOpenChangingPasswordSuccess = () => {
        this.setState({
            loadSignInForm: false,
            loadSignUpForm: false,
            loadForgotPasswordForm: false,
            loadChangingPasswordSuccess: true,
        })
    }


    handleBackSignInForm = () => {
        this.setState({
            loadSignInForm: true,
            loadSignUpForm: false,
            loadForgotPasswordForm: false,
            loadChangingPasswordSuccess: false,
        })
    }


    renderTitle = () => {
        let { loadSignInForm, loadSignUpForm,
            loadForgotPasswordForm, loadChangingPasswordSuccess } = this.state

        return (
            <>
                {loadForgotPasswordForm === true || loadChangingPasswordSuccess === true ?
                    <>
                        {loadChangingPasswordSuccess === true ? <></> :
                            <div className='log-in-header-text log-in-header-forgot-password'>
                                <FormattedMessage id="customer.login.recovery-password" />
                            </div>}
                    </>
                    :
                    <>
                        <div className={loadSignInForm === true ?
                            'log-in-header-text log-in-header-sign-in active' :
                            'log-in-header-text log-in-header-sign-in'}
                            onClick={() => this.handleOpenSignInForm()}>
                            <FormattedMessage id="customer.login.sign-in-text" />
                        </div>
                        <div className={loadSignUpForm === true ?
                            'log-in-header-text log-in-header-sign-up active' :
                            'log-in-header-text log-in-header-sign-up'}
                            onClick={() => this.handleOpenSignUpForm()} >
                            <FormattedMessage id="customer.login.sign-up-text" />
                        </div>
                    </>
                }
            </>
        )
    }

    render() {
        let { loadSignInForm, loadSignUpForm,
            loadForgotPasswordForm, loadChangingPasswordSuccess } = this.state

        return (
            <>
                <Header />
                <div className='log-in-container'>
                    <div className='log-in-content'>
                        <div className='log-in-form'>
                            <div className='log-in-header'>
                                {this.renderTitle()}
                            </div>

                            <div className='log-in-form-input'>
                                <SignInComponent
                                    isOpenSignInForm={loadSignInForm}
                                    handleOpenForgotPasswordForm={this.handleOpenForgotPasswordForm} />
                                <SignUpComponent
                                    isOpenSignUpForm={loadSignUpForm} />
                                <ForgotPasswordComponent
                                    isOpenForgotPasswordForm={loadForgotPasswordForm}
                                    backSignInForm={this.handleBackSignInForm}
                                    handleOpenChangingPasswordSuccess={this.handleOpenChangingPasswordSuccess} />
                                <ChangingPasswordSuccessComponent
                                    isOpenChangingPasswordSuccess={loadChangingPasswordSuccess}
                                    backSignInForm={this.handleBackSignInForm} />
                            </div>
                        </div>
                    </div>
                </div>


                <SignUpNewletter />
                <Footer />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (email, password) => dispatch(actions.userLogin(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
