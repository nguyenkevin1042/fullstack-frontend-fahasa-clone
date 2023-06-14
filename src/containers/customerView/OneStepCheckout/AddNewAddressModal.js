import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './AddNewAddressModal.scss';
// import * as actions from "../store/actions";
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
            shippingAddress: '',


        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }


    render() {
        let { fullName, phoneNumber, country, province, district, ward, shippingAddress } = this.state
        let { isOpenAddNewAddress, closeAddNewAddress } = this.props
        return (
            <Modal isOpen={isOpenAddNewAddress}
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
                            id='fullName'
                            value={fullName}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.province" />
                        </label>
                        <input type='text' className='form-control'
                            id='fullName'
                            value={fullName}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.district" />
                        </label>
                        <input type='text' className='form-control'
                            id='fullName'
                            value={fullName}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.ward" />
                        </label>
                        <input type='text' className='form-control'
                            id='fullName'
                            value={fullName}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>
                    <div className="col-12 form-group">
                        <label>
                            <FormattedMessage id="customer.one-time-checkout.shipping-address" />
                        </label>
                        <input type='text' className='form-control'
                            id='fullName'
                            value={fullName}
                            onChange={(event) => this.handleOnChangeInput(event)}
                            required />
                    </div>

                    <div className="save-new-address-btn">
                        <button onClick={closeAddNewAddress}>
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
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewAddressModal));
