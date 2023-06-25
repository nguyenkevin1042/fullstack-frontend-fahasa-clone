import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './AccountModal.scss';
import { Modal } from 'reactstrap'
import SignInComponent from '../../Login/SignInComponent';
import SignUpComponent from '../../Login/SignUpComponent';
import ForgotPasswordComponent from '../../Login/ForgotPasswordComponent';

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
        // this.setState({
        //     loadSignInForm: this.props.loadSignInForm,
        //     loadSignUpForm: this.props.loadSignUpForm
        // })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.loadSignInForm !== this.props.loadSignInForm) {
            this.setState({
                loadSignUpForm: this.props.loadSignUpForm,
                loadSignInForm: this.props.loadSignInForm
            })
        }
        if (prevProps.loadSignUpForm !== this.props.loadSignUpForm) {
            this.setState({
                loadSignInForm: this.props.loadSignInForm,
                loadSignUpForm: this.props.loadSignUpForm
            })
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

    handleCloseModal = () => {
        this.props.closeAccountModal()
        this.setState({
            loadSignInForm: true,
            loadSignUpForm: false,
            loadForgotPasswordForm: false
        })
    }

    renderTitle = () => {
        let { loadSignInForm, loadSignUpForm, loadForgotPasswordForm } = this.state

        return (
            <>
                {loadForgotPasswordForm === true ?
                    <>
                        <div className='log-in-header-text log-in-header-forgot-password'>
                            <FormattedMessage id="customer.login.recovery-password" />
                        </div>
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
                        </div></>
                }
            </>
        )
    }


    render() {
        let { loadSignInForm, loadSignUpForm, loadForgotPasswordForm } = this.state
        let { isModalOpened, closeAccountModal } = this.props

        return (
            <Modal isOpen={isModalOpened}
                toggle={this.handleCloseModal}
                className={'account-modal-container'}>


                <div className='log-in-content'>
                    <div className='log-in-form'>
                        <div className='log-in-header'>
                            {this.renderTitle()}
                        </div>

                        <div className='log-in-form-input'>
                            <SignInComponent
                                isOpenSignInForm={loadSignInForm}
                                handleOpenForgotPasswordForm={this.handleOpenForgotPasswordForm}
                                closeAccountModal={closeAccountModal} />
                            <SignUpComponent
                                isOpenSignUpForm={loadSignUpForm} />
                            <ForgotPasswordComponent
                                isOpenForgotPasswordForm={loadForgotPasswordForm} />
                        </div>

                        <div className='close-modal-btn'>
                            <button onClick={() => this.handleCloseModal()}><FormattedMessage id="customer.login.skip-text" /></button>
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
