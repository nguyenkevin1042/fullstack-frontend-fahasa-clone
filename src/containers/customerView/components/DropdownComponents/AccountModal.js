import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './AccountModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem } from 'reactstrap'
import SignInComponent from '../../Login/SignInComponent';
import SignUpComponent from '../../Login/SignUpComponent';
import ForgotPasswordComponent from '../../Login/ForgotPasswordComponent';

// import * as actions from "../store/actions";

class AccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadSignInForm: true,
            loadSignUpForm: false,
            loadForgotPasswordForm: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

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
            loadForgotPasswordForm: false
        })
    }

    handleOpenForgotPasswordForm = () => {
        this.setState({
            loadSignInForm: false,
            loadSignUpForm: false,
            loadForgotPasswordForm: true
        })
    }

    renderTitle = () => {
        let { loadSignInForm, loadSignUpForm, loadForgotPasswordForm } = this.state

        return (
            <>
                {loadForgotPasswordForm === true ?
                    <>
                        <div className='account-modal-header-text account-modal-header-forgot-password'>
                            <FormattedMessage id="customer.login.recovery-password" />
                        </div>
                    </>
                    :
                    <>
                        <div className={loadSignInForm === true ?
                            'account-modal-header-text account-modal-header-sign-in active' :
                            'account-modal-header-text account-modal-header-sign-in'}
                            onClick={() => this.handleOpenSignInForm()}>
                            <FormattedMessage id="customer.login.sign-in-text" />
                        </div>
                        <div className={loadSignUpForm === true ?
                            'account-modal-header-text account-modal-header-sign-up active' :
                            'account-modal-header-text account-modal-header-sign-up'}
                            onClick={() => this.handleOpenSignUpForm()} >
                            <FormattedMessage id="customer.login.sign-up-text" />
                        </div></>
                }
            </>
        )
    }


    render() {
        let { loadSignInForm, loadSignUpForm, loadForgotPasswordForm } = this.state
        let { isModalOpened } = this.props
        return (
            <Modal isOpen={isModalOpened}
                className={'account-modal-container'}>


                <div className='account-modal-content'>
                    <div className='account-modal-form'>
                        <div className='account-modal-header'>
                            {this.renderTitle()}
                        </div>

                        <div className='account-modal-form-input'>
                            <SignInComponent
                                isOpenSignInForm={loadSignInForm}
                                handleOpenForgotPasswordForm={this.handleOpenForgotPasswordForm} />
                            <SignUpComponent
                                isOpenSignUpForm={loadSignUpForm} />
                            <ForgotPasswordComponent
                                isOpenForgotPasswordForm={loadForgotPasswordForm} />

                        </div>
                    </div>
                </div>
            </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
