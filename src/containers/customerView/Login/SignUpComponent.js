import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './SignUpComponent.scss';
import * as actions from "../../../store/actions";
import { CommonUtils, languages } from '../../../utils';

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            isShowed: false,

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            this.setState({
                message: this.props.lang === languages.VI ?
                    this.props.actionResponse.messageVI :
                    this.props.actionResponse.messageEN
            })

            if (this.props.actionResponse.errCode === 0) {
                if (this.props.history) {
                    this.props.history.push("/customer/account/dashboard");

                }
            }
        }
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleSignUp = async () => {
        this.setState({
            message: ''
        })

        let isCorrect = CommonUtils.validatePassword(this.state.password)

        if (isCorrect.errCode === 0) {
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                isAdmin: false
            })
        } else {
            this.setState({
                message: this.props.lang === languages.VI ?
                    isCorrect.messageVI : isCorrect.messageEN
            })
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowed: !this.state.isShowed
        });
    }

    render() {
        let { email, password, message, isShowed } = this.state
        let { isOpenSignUpForm } = this.props;

        return (
            <>
                {isOpenSignUpForm === true &&
                    <>
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.email-phone" /></label>
                            <input className='form-control'
                                placeholder='Email'
                                value={email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                required />
                        </div>
                        <div className="col-12 form-group custom-input-password">
                            <label><FormattedMessage id="customer.login.password" /></label>
                            <input className='form-control'
                                type={isShowed ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                required />
                            <span onClick={() => this.handleShowHidePassword()}>
                                <i className={isShowed ? "far fa-eye show-hide-icon" : "far fa-eye-slash show-hide-icon"}></i>
                            </span>
                        </div>
                        <div className='col-12 error-message mt-4'>
                            {message}
                        </div>
                        <div className="col-12 sign-in-btn ">
                            <button onClick={() => this.handleSignUp()}>
                                <FormattedMessage id="customer.login.sign-up-text" />
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
        actionResponse: state.admin.actionResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpComponent));
