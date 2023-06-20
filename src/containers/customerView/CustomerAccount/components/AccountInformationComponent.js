import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './AccountInformationComponent.scss';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';

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

            listGender: [],
            message: ''
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('gender')

        if (this.props.userInfo) {
            this.setState({
                firstName: this.props.userInfo.firstName,
                lastName: this.props.userInfo.lastName,
                phoneNumber: this.props.userInfo.phoneNumber,
                email: this.props.userInfo.email,
                gender: this.props.userInfo.gender,
                birthday: '',
            });
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.actionResponse !== this.props.actionResponse) {
            this.setState({
                message: this.props.lang === languages.VI ?
                    this.props.actionResponse.messageVI :
                    this.props.actionResponse.messageEN
            })
        }

        if (prevProps.allCodesArr !== this.props.allCodesArr ||
            prevProps.lang !== this.props.lang) {
            let dataGender = this.buildDataInputSelect(this.props.allCodesArr);
            this.setState({
                listGender: dataGender
            })
        }

        if (this.props.userInfo && prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                firstName: this.props.userInfo.firstName,
                lastName: this.props.userInfo.lastName,
                phoneNumber: this.props.userInfo.phoneNumber,
                email: this.props.userInfo.email,
                gender: this.props.userInfo.gender,
                birthday: '',
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;

        inputData.map((item, index) => {
            let obj = {};
            let labelVI = item.valueVI;
            let labelEN = item.valueEN;

            obj.keyMap = item.keyMap;
            obj.label = language === languages.VI ? labelVI : labelEN;
            result.push(obj);
        });

        return result;
    }

    handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    onChangeRadioValue = (event) => {
        console.log()
        this.setState({
            gender: event.target.value
        })
    }

    handleSaveChanges = async () => {
        await this.props.updateUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            gender: this.state.gender,
            birthday: this.state.birthday,
        })
    }


    render() {
        let { firstName, lastName, phoneNumber, email, gender, birthday,
            oldPassword, newPassword, retypeNewPassword, message, listGender } = this.state

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
                            // onChange={(event) => this.handleOnChangeInput(event)}
                            readOnly />
                    </div>

                    <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.gender' />
                        </label>
                        <div className='select-gender-option'>
                            {listGender && listGender.length > 0 && (
                                listGender.map((item, index) => (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            value={item.keyMap}
                                            name="gender"
                                            onChange={(event) => this.onChangeRadioValue(event)}
                                            checked={gender === item.keyMap ? true : false}
                                        />
                                        {item.label}
                                    </label>
                                ))
                            )}

                        </div>

                    </div>

                    {/* <div className='row mt-3'>
                        <label className='col-xl-3'>
                            <FormattedMessage id='customer.account.account-information.birthday' />
                        </label>
                    </div> */}

                    <div className=' error-message mt-4'>
                        {message}
                    </div>

                    <div className='row mt-3'>
                        <button className='save-changes-btn'
                            onClick={() => this.handleSaveChanges()}>
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
        allCodesArr: state.admin.allCodesArr,
        actionResponse: state.user.actionResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (inputData) => dispatch(actions.updateUser(inputData)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountInformationComponent));
