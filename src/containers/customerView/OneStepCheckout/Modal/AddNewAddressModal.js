import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './AddNewAddressModal.scss';
import * as actions from "../../../../store/actions";
import { Modal } from 'reactstrap'

class AddNewAddressModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            country: '',
            province: '',
            district: '',
            ward: '',
            addressDetail: '',
            addressType: 'SHIPPING_ADDRESS',
            userId: ''
        };
    }

    componentDidMount() {
        let { userInfo } = this.props

        if (userInfo) {
            let firstName = userInfo && userInfo.firstName && userInfo.firstName !== null ?
                userInfo.firstName : '';
            let lastName = userInfo && userInfo.lastName && userInfo.lastName !== null ?
                userInfo.lastName + ' ' : '';
            this.setState({
                fullName: lastName + firstName,
                phoneNumber: userInfo.phoneNumber,
                userId: userInfo.id
            });
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.actionResponse !== this.props.actionResponse) {
            if (this.props.actionResponse.errCode === 0) {
                this.props.closeAddNewAddress()
            }
        }
    }

    handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleSaveNewAddress = async () => {
        await this.props.createNewAddress({ ...this.state })
    }

    render() {
        let { fullName, phoneNumber, country, province, district, ward, addressDetail } = this.state
        let { isOpenAddNewAddress, closeAddNewAddress } = this.props

        // console.log(this.props.actionResponse)
        return (
            <Modal isOpen={isOpenAddNewAddress}
                toggle={closeAddNewAddress}
                size='md'
                centered>
                <div className='sharing-modal-container add-new-address-modal'>

                    <div className='sharing-modal-header add-new-address-title'>
                        <FormattedMessage id="customer.one-time-checkout.add-new-address-text" />
                    </div>

                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.full-name" />
                        </label>
                        <input type='text' className='form-control'
                            id='fullName'
                            value={fullName}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.phone-number" />
                        </label>
                        <input type='text' className='form-control'
                            id='phoneNumber'
                            value={phoneNumber}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.country" />
                        </label>
                        <input type='text' className='form-control'
                            id='country'
                            value={country}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.province" />
                        </label>
                        <input type='text' className='form-control'
                            id='province'
                            value={province}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.district" />
                        </label>
                        <input type='text' className='form-control'
                            id='district'
                            value={district}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.ward" />
                        </label>
                        <input type='text' className='form-control'
                            id='ward'
                            value={ward}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.shipping-address" />
                        </label>
                        <input type='text' className='form-control'
                            id='addressDetail'
                            value={addressDetail}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>

                    <div className="save-new-address-btn">
                        <button onClick={() => this.handleSaveNewAddress()}>
                            <FormattedMessage id="customer.one-time-checkout.save-address" />
                        </button>
                    </div>
                </div>
            </Modal>


        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        actionResponse: state.user.actionResponse,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewAddress: (inputData) => dispatch(actions.createNewAddress(inputData))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewAddressModal));
