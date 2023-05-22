import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
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

    hanldeClickBackBtn = () => {
        if (this.props.history) {
            this.props.history.push("/home");
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
                                <FormattedMessage id="customer.login.confirm-text" />
                            </button>
                        </div >
                        <div className="col-12 back-btn ">
                            <button onClick={() => this.hanldeClickBackBtn()}>
                                <FormattedMessage id="customer.login.back-text" />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent));
