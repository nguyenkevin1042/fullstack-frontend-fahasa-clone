import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './AccountInformationComponent.scss';
// import * as actions from "../store/actions";

class AccountInformationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            birthday: '',
            oldPassword: '',
            newPassword: '',
            retypeNewPassword: '',

        };
    }

    componentDidMount() {

        this.setState = {
            firstName: this.props.userInfo.firstName,

        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (this.props.userInfo && prevProps.userInfo !== this.props.userInfo) {
            this.setState = {
                firstName: this.props.userInfo.firstName,
                // lastName: this.props.userInfo.lastname,
                // phoneNumber: this.props.userInfo.phoneNumber,
                // email: this.props.userInfo.email,
                // gender: '',
                // birthday: '',
            };
        }


    }

    handleOnChangeInput = (event) => {
        // let key = event.target.id;
        // let data = event.target.value;
        // console.log(key, data)
        // let copyState = { ...this.state };
        // copyState[key] = data;
        // this.setState({ ...copyState });
    }


    render() {
        let { firstName, lastName, phoneNumber, email, gender, birthday, oldPassword, newPassword, retypeNewPassword } = this.state

        console.log(this.state)
        console.log(this.props.userInfo.firstName)
        return (
            <React.Fragment>
                <div className='right-content-header'>
                    <FormattedMessage id='customer.account.account-information.title' />
                </div>

                <div className='account-information-container'>
                    <div className='row'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.last-name' />
                        </label>
                        <input className='form-control col-xl-7'
                            value={lastName}
                            id='lastName'
                            onChange={(event) => this.handleOnChangeInput(event)} />
                    </div>

                    <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.first-name' />
                        </label>
                        <input className='form-control col-xl-7'
                            value={firstName}
                            id='firstName'
                            onChange={(event) => this.handleOnChangeInput(event)} />
                    </div>

                    <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.phone-number' />
                        </label>
                        <input className='form-control col-xl-7'
                            readOnly
                            value={phoneNumber}
                            id='phoneNumber'
                            onChange={(event) => this.handleOnChangeInput(event)} />
                    </div>

                    <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.email' />
                        </label>
                        <input className='form-control col-xl-7'
                            value={email}
                            id='email'
                            onChange={(event) => this.handleOnChangeInput(event)} />
                    </div>

                    <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.gender' />
                        </label>

                    </div>

                    <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.birthday' />
                        </label>

                    </div>

                    <div className='row mt-3'>
                        <button className='save-changes-btn'>
                            <FormattedMessage id='customer.account.account-information.save-changes-text' />
                        </button>

                    </div>

                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountInformationComponent));
