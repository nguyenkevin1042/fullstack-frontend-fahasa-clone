import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SignUpComponent.scss';
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';

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

        if (prevProps.actionResponse !== this.props.actionResponse) {
            this.setState({
                message: this.props.lang === languages.VI ?
                    this.props.actionResponse.messageVI :
                    this.props.actionResponse.messageEN
            })
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
        await this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            isAdmin: false
        })
    }


    render() {
        let { email, password, message } = this.state
        let { isOpenSignUpForm, actionResponse } = this.props;

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
