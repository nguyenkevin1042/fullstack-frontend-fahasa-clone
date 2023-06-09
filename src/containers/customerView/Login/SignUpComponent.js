import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SignUpComponent.scss';
import * as actions from "../../../store/actions";

class SignUpComponent extends Component {
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

    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleSignUp = async () => {
        await this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            isAdmin: false
        })
    }


    render() {
        let { email, password, message } = this.state
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
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.password" /></label>
                            <input type='password' className='form-control'
                                placeholder='Password'
                                value={password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                required />
                        </div>
                        <div className="col-12 sign-in-btn ">
                            <button onClick={() => this.handleSignUp()}>
                                <FormattedMessage id="customer.login.sign-up-text" />
                            </button>
                        </div >
                        <div className='col-12 error-message mt-4'>
                            {message}
                        </div>
                    </>
                }
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        errResponse: state.admin.signUpResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
