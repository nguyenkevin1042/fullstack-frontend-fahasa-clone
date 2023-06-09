import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './SignInComponent.scss';
import * as actions from "../../../store/actions";

import { languages } from '../../../utils';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: ''
        };
    }

    componentDidMount() {
        this.setState({
            message: ''
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.actionResponse !== this.props.actionResponse) {
            this.setState({
                message: this.props.lang === languages.VI ?
                    this.props.actionResponse.messageVI :
                    this.props.actionResponse.messageEN
            })
        }
        if (prevProps.actionResponse !== this.props.actionResponse) {
            // this.setState({
            //     message: this.props.signInMessage
            // })

        }

    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleLogin = async () => {
        let { actionResponse } = this.props

        this.setState({
            message: ''
        })
        await this.props.userLogin(this.state.email, this.state.password)

        if (actionResponse.errCode === 0) {
            await this.props.history.push("/home");
            if (this.props.closeAccountModal) {
                await this.props.closeAccountModal();
            }
        }

    }


    render() {
        let { email, password, message } = this.state;

        let { isOpenSignInForm, handleOpenForgotPasswordForm, actionResponse } = this.props;

        let language = this.props.lang

        console.log(actionResponse)
        return (
            <>
                {isOpenSignInForm === true &&
                    <>
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.email-phone" /></label>
                            <input className='form-control'
                                placeholder='Email'
                                value={email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                required />
                        </div>
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.password" /></label>
                            <input type='password' className='form-control'
                                placeholder='Password'
                                value={password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                required />
                        </div>

                        <div className="col-12 forgot-password"
                            onClick={() => handleOpenForgotPasswordForm()}>
                            <FormattedMessage id="customer.login.forgot-password" />
                        </div>
                        <div className='col-12 error-message mt-4'>
                            {message}
                        </div>
                        <div className="col-12 sign-in-btn ">
                            <button onClick={(event) => { this.handleLogin(event) }}>
                                <FormattedMessage id="customer.login.sign-in-text" />
                            </button>
                        </div >

                    </>
                }
            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        actionResponse: state.user.actionResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (email, password) => dispatch(actions.userLogin(email, password)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInComponent));
