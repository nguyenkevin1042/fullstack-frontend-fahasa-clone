import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './VerifySignUp.scss';
import Header from '../../components/Header';
import SignUpNewletter from '../../Homepage/SignUpNewletter';
import Footer from '../../components/Footer';

class VerifySignUp extends Component {
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

    handleToHomepage = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    handleToDashboard = () => {
        if (this.props.history) {
            this.props.history.push('/customer/account/dashboard')
        }
    }


    render() {
        return (
            <React.Fragment>
                <Header />

                <div className='completed-sign-up-container'>
                    <div className='completed-sign-up-content'>
                        <div className='completed-sign-up-title'>
                            <FormattedMessage id="customer.login.sign-up-success" />
                        </div>
                        <div className='completed-sign-up-icon'></div>
                        <div className='completed-sign-up-button'>
                            <button className='to-homepage-btn'
                                onClick={() => this.handleToHomepage()}>
                                <FormattedMessage id="customer.login.to-homepage" />
                            </button>
                            <button className='check-order-btn'
                                onClick={() => this.handleToDashboard()}>
                                <FormattedMessage id="customer.login.to-account" />
                            </button>
                        </div>
                    </div>
                </div>

                <SignUpNewletter />
                <Footer />

            </React.Fragment >

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifySignUp));
