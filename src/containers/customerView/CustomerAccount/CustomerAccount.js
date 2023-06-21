import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CustomerAccount.scss';
import { languages } from '../../../utils'
// import * as actions from "../store/actions";
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import DashboardComponent from './components/DashboardComponent';
import AccountInformationComponent from './components/AccountInformationComponent';
import AddressComponent from './components/AddressComponent';
import MyOrderComponent from './components/MyOrderComponent';

class CustomerAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: ''
        };
    }

    componentDidMount() {
        // document.title = "Account | Nguyenkevin1042's Fahasa Clone"
        if (!this.props.userInfo) {
            if (this.props.history) {
                this.props.history.push("/customer/account/login");
            }
        }
        if (this.props.match.params.section) {
            this.setState({
                selectedSection: this.props.match.params.section
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.match.params.section !== this.props.match.params.section) {
            this.setState({
                selectedSection: this.props.match.params.section
            })
        }
    }

    handleChooseMenu = (event) => {
        let data = event.target.id;
        let copyState = { ...this.state };
        copyState.selectedSection = data;
        this.setState({ ...copyState });
        if (this.props.history) {
            this.props.history.push("/customer/account/" + event.target.id);
        }
    }

    renderRightContent = () => {
        let { selectedSection } = this.state
        return (
            <>
                {selectedSection === 'dashboard' && (<DashboardComponent />)}
                {selectedSection === 'account-information' && (<AccountInformationComponent />)}
                {selectedSection === 'address' && (<AddressComponent />)}
                {selectedSection === 'my-orders' && (<MyOrderComponent />)}
                {selectedSection === 'voucher' && (<DashboardComponent />)}
                {selectedSection === 'f-point' && (<DashboardComponent />)}
                {selectedSection === 'my-reviews' && (<DashboardComponent />)}
                {selectedSection === 'notification' && (<DashboardComponent />)}
                {selectedSection === 'sign-up-newletter' && (<DashboardComponent />)}

            </>
        )
    }

    render() {
        let { selectedSection } = this.state

        return (
            <React.Fragment>
                <Header />
                <div className='account-container'>
                    <div className='row'>
                        <div className='account-left-container col-12 col-lg-3'>
                            <div className='left-content'>
                                <div className='left-content-header'>
                                    <FormattedMessage id='customer.account.title' />
                                </div>
                                <div className='left-content-options'>
                                    <ul>
                                        <li className={selectedSection === 'dashboard' ? 'active' : ''}
                                            id='dashboard'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.dashboard.title' />
                                        </li>
                                        <li className={selectedSection === 'account-information' ? 'active' : ''}
                                            id='account-information'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.account-information.title' />
                                        </li>
                                        <li className={selectedSection === 'address' ? 'active' : ''}
                                            id='address'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.address.title' />
                                        </li>
                                        <li className={selectedSection === 'my-orders' ? 'active' : ''}
                                            id='my-orders'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.my-orders.title' />
                                        </li>
                                        <li className={selectedSection === 'voucher' ? 'active' : ''}
                                            id='voucher'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.voucher' />
                                        </li>
                                        <li className={selectedSection === 'f-point' ? 'active' : ''}
                                            id='f-point'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.f-point' />
                                        </li>
                                        <li className={selectedSection === 'my-reviews' ? 'active' : ''}
                                            id='my-reviews'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.my-reviews' />
                                        </li>
                                        <li className={selectedSection === 'notification' ? 'active' : ''}
                                            id='notification'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.notification' />
                                        </li>
                                        <li className={selectedSection === 'sign-up-newletter' ? 'active' : ''}
                                            id='sign-up-newletter'
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            <FormattedMessage id='customer.account.newletter' />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='account-right-container col-12 col-lg-9'>
                            <div className='right-content'>
                                {this.renderRightContent()}
                            </div>
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
        lang: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccount);
