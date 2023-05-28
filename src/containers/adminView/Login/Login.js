import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './Login.scss';
import SignUpModel from './SignUpModel/SignUpModel';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            isModalOpened: false,

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.signInMessage !== this.props.signInMessage) {
            this.setState({
                message: this.props.signInMessage
            })
        }

    }

    handleLogin = async () => {
        this.setState({
            message: ''
        })
        await this.props.adminLogin(this.state.email,
            this.state.password
        )
    }

    handleOpenSignUpModel = () => {
        this.setState({
            isModalOpened: true
        })
    }

    handleCloseSignUpModel = () => {
        this.setState({
            isModalOpened: false
        })
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }


    render() {
        let { isModalOpened, email, password, message } = this.state;
        console.log(this.props.signInMessage)
        return (
            <>
                <div className='login-form-background'>
                    <div className="login-form-container">
                        <div className="text-center login-form-title">
                            <h3>Sign In</h3>
                        </div>
                        <div className="login-form-input-field row">
                            <div className="col-12 form-group">
                                <input className='form-control'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    required />
                            </div>
                            <div className="col-12 form-group">
                                <input className='form-control'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                    required />
                            </div>
                            <div className='col-12 error-message mt-4'>
                                {message}
                            </div>
                            <div className="col-12">
                                <button className='btn-sign-in'
                                    onClick={(event) => { this.handleLogin(event) }}>Sign in</button>
                            </div>
                            <div className='col-12'>
                                <p className='sign-up text-center'>
                                    Don't have an admin account. Click
                                    <span onClick={() => { this.handleOpenSignUpModel() }}> here </span> to sign up
                                </p>
                            </div>

                            <div className='col-12'>
                                <p className='forgot-password text-center'>Forgot your password?</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SignUpModel
                    isModalOpened={isModalOpened}
                    closeSignUpModel={this.handleCloseSignUpModel} />

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        signInMessage: state.admin.signInMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLogin: (email, password) => dispatch(actions.adminLogin(email, password)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
