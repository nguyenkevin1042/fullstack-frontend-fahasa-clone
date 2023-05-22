import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SignInComponent.scss';
import * as actions from "../../../store/actions";

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

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleLogin = async () => {
        this.setState({
            message: ''
        })
        await this.props.userLogin(this.state.email,
            this.state.password
        )

        // if (this.props.history) {
        //     this.props.history.push("/home");
        // }
    }


    render() {
        let { email, password, message } = this.state;

        let { isOpenSignInForm, handleOpenForgotPasswordForm } = this.props;

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
                        <div className='col-12 error-message mt-4'>
                            {message}
                        </div>
                        <div className="col-12 forgot-password"
                            onClick={() => handleOpenForgotPasswordForm()}>
                            <FormattedMessage id="customer.login.forgot-password" />
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
        signInMessage: state.user.signInMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (email, password) => dispatch(actions.userLogin(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
