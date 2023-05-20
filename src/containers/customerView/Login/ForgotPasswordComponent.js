import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ForgotPasswordComponent.scss';
// import * as actions from "../store/actions";

class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }


    render() {
        let { isOpenForgotPasswordForm } = this.props;

        return (
            <>
                {isOpenForgotPasswordForm === true &&
                    <>
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.email-phone" /></label>
                            <input className='form-control'
                                placeholder='Email'
                                required />
                        </div>
                        <div className="col-12 form-group">
                            <label><FormattedMessage id="customer.login.password" /></label>
                            <input type='password' className='form-control'
                                placeholder='Password'
                                required />
                        </div>

                        <div className="col-12 sign-in-btn ">
                            <button >
                                <FormattedMessage id="customer.login.sign-in-text" />
                            </button>
                        </div >
                        <div className="col-12 sign-in-btn ">
                            <button >
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
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent);
