import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { CommonUtils, languages } from '../../../utils';
import * as actions from "../../../store/actions";
import LoadingOverlay from 'react-loading-overlay';

class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            newPassword: '',
            validationKey: '',
            message: '',
            isShowed: false,
            isLoading: false,
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    startLoading = () => {
        this.setState({
            isLoading: true
        })
    }

    stopLoading = () => {
        this.setState({
            isLoading: false
        })
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowed: !this.state.isShowed
        });
    }

    handleGetValidationKey = async () => {
        this.startLoading();
        this.setState({
            message: ''
        })

        let isEmailValid = CommonUtils.validateEmail(this.state.email)

        if (isEmailValid.errCode === 0) {
            await this.props.getValidationKey(this.state.email)
            if (this.props.actionResponse && this.props.actionResponse.errCode === 0) {
                this.setState({
                    message: this.props.lang === languages.VI ?
                        this.props.actionResponse.messageVI : this.props.actionResponse.messageEN
                })
            }
        } else {
            this.setState({
                message: this.props.lang === languages.VI ?
                    isEmailValid.messageVI : isEmailValid.messageEN
            })
        }
        this.stopLoading();
    }

    handleOffKeyIfLengthEqual = (event, length) => {
        console.log(event.target.value.length)
        // return false;
    }

    handleAcceptToChangePassword = async () => {
        this.startLoading()
        this.setState({
            message: ''
        })

        let isEmailValid = CommonUtils.validateEmail(this.state.email)

        //1. check email
        if (isEmailValid.errCode === 0) {
            //2. check password
            let isPasswordValid = CommonUtils.validatePassword(this.state.newPassword)

            if (isPasswordValid.errCode === 0) {
                //3. check key
                let isKeyValid = CommonUtils.validateKey(this.state.validationKey)

                if (isKeyValid.errCode === 0) {
                    await this.props.changePassword({
                        email: this.state.email,
                        password: this.state.newPassword,
                        key: this.state.validationKey,
                    })

                    if (this.props.actionResponse && this.props.actionResponse.errCode === 0) {
                        this.props.handleOpenChangingPasswordSuccess()
                    } else {
                        this.setState({
                            message: this.props.lang === languages.VI ?
                                this.props.actionResponse.messageVI : this.props.actionResponse.messageEN
                        })
                    }
                } else {
                    this.setState({
                        message: this.props.lang === languages.VI ?
                            isKeyValid.messageVI : isKeyValid.messageEN
                    })
                } //End checking key
            } else {
                this.setState({
                    message: this.props.lang === languages.VI ?
                        isPasswordValid.messageVI : isPasswordValid.messageEN
                })
            }//End checking password
        } else {
            this.setState({
                message: this.props.lang === languages.VI ?
                    isEmailValid.messageVI : isEmailValid.messageEN
            })
        } //End checking email
        this.stopLoading()
    }


    render() {
        let { email, newPassword, validationKey, message, isShowed, isLoading } = this.state
        let { isOpenForgotPasswordForm, backSignInForm } = this.props;

        return (
            <LoadingOverlay
                classNamePrefix='Fullscreen_'
                active={isLoading}
                spinner={true}
                text='Please wait...'>
                {isOpenForgotPasswordForm === true &&
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="col-12 form-group custom-input">
                            <label><FormattedMessage id="customer.login.email-phone" /></label>
                            <input className='form-control'
                                value={email}
                                required
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                            />
                            <span className='custom-input-item get-code-text'
                                onClick={() => this.handleGetValidationKey()}>
                                <FormattedMessage id="customer.login.get-code" />
                            </span>
                        </div>
                        <div className="col-12 form-group custom-input">
                            <label><FormattedMessage id="customer.login.password" /></label>
                            <input className='form-control' value={newPassword}
                                type={isShowed ? 'text' : 'password'}
                                autoComplete='off'
                                required
                                onChange={(event) => this.handleOnChangeInput(event, 'newPassword')}
                            />
                            <span className='custom-input-item'
                                onClick={() => this.handleShowHidePassword()}>
                                <i className={isShowed ? "far fa-eye show-hide-icon" : "far fa-eye-slash show-hide-icon"}></i>
                            </span>
                        </div>
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.validatiton-key" /></label>
                            <input className='form-control'
                                type='number'
                                value={validationKey}
                                required
                                // max={6}
                                // onKeyPress={(event) => this.handleOffKeyIfLengthEqual(event, 6)}
                                onChange={(event) => this.handleOnChangeInput(event, 'validationKey')}
                            />
                        </div>
                        <div className='col-12 error-message mt-4'>
                            {message}
                        </div>
                        <div className="col-12 sign-in-btn ">
                            <button onClick={() => this.handleAcceptToChangePassword()}>
                                <FormattedMessage id="customer.login.confirm-text" />
                            </button>
                        </div >
                        <div className="col-12 back-btn ">
                            <button onClick={backSignInForm}>
                                <FormattedMessage id="customer.login.back-text" />
                            </button>
                        </div >
                    </form>
                }
            </LoadingOverlay>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        actionResponse: state.user.actionResponse,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getValidationKey: (inputEmail) => dispatch(actions.getValidationKey(inputEmail)),
        changePassword: (inputData) => dispatch(actions.changePassword(inputData)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent));
