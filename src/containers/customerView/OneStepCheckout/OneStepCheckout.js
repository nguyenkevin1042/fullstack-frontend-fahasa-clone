import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './OneStepCheckout.scss';
import Header from '../components/Header';
import AddNewAddressModal from './Modal/AddNewAddressModal';
import NumericFormat from 'react-number-format';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";
import LoadingOverlay from 'react-loading-overlay'


class OneStepCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAddNewAddress: false,
            listProduct: [],
            listPayment: [],
            listUserAddress: [],
            selectedPayment: '',
            selectedAddress: '',
            isLoading: false,
        };
    }

    async componentDidMount() {
        document.title = "One Step Checkout | Nguyenkevin1042's Fahasa Clone"

        let listSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts'))
        if (this.props.userInfo) {
            if (listSelectedProducts) {
                await this.props.fetchAllCodesByType('payment')
                this.setState({
                    listUserAddress: this.props.userInfo.UserAddresses,
                    listProduct: listSelectedProducts,
                    selectedPayment: this.state.listPayment[0],
                    selectedAddress: this.props.userInfo.UserAddresses[0],
                })
            }
        } else {
            this.props.history.push("/home");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                listUserAddress: this.props.userInfo.UserAddresses,
                selectedAddress: this.props.userInfo.UserAddresses[0],
            })
        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataPayment = this.buildDataInputSelect(this.props.allCodesArr, 'payment');
            this.setState({
                listPayment: dataPayment,
                selectedPayment: this.state.listPayment[0],
            })
        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            if (this.props.actionResponse.errCode === 0) {
                if (this.props.history) {
                    this.props.history.push("/make-order-success");
                }
            }
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === 'payment') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyMap = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === 'address') {
                inputData.map((item, index) => {
                    let obj = {};

                    obj.id = item.id;

                    result.push(obj);
                });
            }
        }
        return result;
    }

    handleOpenAddNewAddress = () => {
        this.setState({
            isOpenAddNewAddress: true
        })
    }

    handleCloseAddNewAddress = () => {
        this.setState({
            isOpenAddNewAddress: false
        })
    }

    handleCloseConfirmAddress = () => {
        this.setState({
            isOpenConfirmAddress: false
        })
    }

    onChangeRadioValue = (event) => {
        let key = event.target.name;
        let data = Object.values(event.target)[2].initialValue;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleBackToCart = () => {
        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }

    handleConfirm = async () => {
        let orderedDate = Date.now();

        // if (this.props.userInfo) {
        await this.props.createNewBill({
            orderedDate: orderedDate,
            userId: this.props.userInfo.id,
            userAddressId: this.state.selectedAddress.id,
            paymentType: this.state.selectedPayment.keyMap,
            totalPrice: this.countTotalPrice(),
            listProduct: this.state.listProduct
        })
        // }
    }

    countTotalPrice = () => {
        let { listProduct } = this.state
        let totalPriceResult = 0
        if (listProduct && listProduct.length > 0) {
            listProduct.map(item => totalPriceResult += item.totalPrice);
        }
        return totalPriceResult;
    }

    renderProductPrice = (price, discount) => {
        let salePrice = price - ((price * discount) / 100);
        return (
            <>
                {discount !== 0 ?
                    <>
                        <div className='item-discount-price'>
                            <NumericFormat value={salePrice}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                        </div>
                        <div className='item-price'>
                            <NumericFormat value={parseFloat(price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                        </div></>
                    :
                    <>
                        <div className='item-discount-price'>
                            <NumericFormat value={parseFloat(price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                        </div></>}
            </>
        )
    }

    renderUserAddress = () => {
        let { listUserAddress, selectedAddress } = this.state
        return (
            <>
                {listUserAddress.length > 0 ?
                    listUserAddress.map((item, index) => (
                        <div key={item.id} className='user-address-item'>
                            <div className='address-text'>
                                < input
                                    type="radio"
                                    value={item}
                                    name="selectedAddress"
                                    onChange={(event) => this.onChangeRadioValue(event)}
                                    checked={selectedAddress.id === item.id ? true : false} />
                                <span>
                                    {item.fullName} | {item.addressDetail}, {item.ward},
                                    {item.district}, {item.province}, {item.country} | {item.phoneNumber}
                                </span>
                            </div>
                            {/* <div className='edit-address-text'>
                                Edit
                            </div> */}
                        </div >
                    )) : <></>}
            </>
        )
    }

    renderPaymentMethod = () => {
        let { listPayment, selectedPayment } = this.state

        return (
            <>
                {listPayment && listPayment.length > 0 && (
                    listPayment.map((item, index) => (
                        <div key={item.id} className='payment-method-item'>
                            < input
                                type="radio"
                                value={item}
                                name="selectedPayment"
                                onChange={(event) => this.onChangeRadioValue(event)}
                                checked={selectedPayment === item ? true : false} />
                            < div className={'payment-img payment-img-' + index} ></div >
                            <div className='payment-text'>{item.label}</div>
                        </div >
                    ))
                )
                }
            </>
        )
    }

    renderProductList = () => {
        let { listProduct } = this.state
        return (
            <>
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => {
                        let imageBase64 = '';
                        let productData = item.productData;
                        if (productData.image) {
                            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
                        }

                        return (
                            <div key={item.id} className={index === 0 ? 'product-item border-top-none' : 'product-item'}>
                                <div className='product-img'
                                    style={{
                                        backgroundImage: "url(" + imageBase64 + ")"
                                    }}></div>
                                <div className='product-name'>
                                    {productData.name}
                                </div>
                                <div className='product-price'>
                                    {this.renderProductPrice(productData.price, productData.discount)}
                                </div>
                                <div className='product-quantity'>
                                    {item.quantity}
                                </div>
                                <div className='product-total-price'>
                                    <NumericFormat value={item.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </div>
                            </div>
                        )
                    })

                }
            </>
        )
    }

    render() {
        let { isOpenAddNewAddress, isLoading } = this.state

        return (
            // <React.Fragment>
            <LoadingOverlay
                classNamePrefix='Fullscreen_'
                active={isLoading}
                spinner={true}
                text='Please wait...'>
                <Header />
                {/* SHIPPING ADDRESS */}
                <div className='shipping-address-container sharing-container'>
                    <div className='shipping-address-content sharing-content'>
                        <div className='shipping-address-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.shipping-address" />
                        </div>
                        <div className='shipping-address-list'>
                            {this.renderUserAddress()}
                        </div>

                        <div className='shipping-address-text'
                            onClick={() => this.handleOpenAddNewAddress()}>
                            <label>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                <span>
                                    <FormattedMessage id="customer.one-time-checkout.shipping-to-another-address" />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* SHIPPING METHOD */}
                {/* <div className='shipping-method-container sharing-container'>
                    <div className='shipping-method-content sharing-content'>
                        <div className='shipping-method-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.shipping-method" />
                        </div>

                    </div>
                </div> */}

                {/* PAYMENT METHOD */}
                <div className='payment-method-container sharing-container'>
                    <div className='payment-method-content sharing-content'>
                        <div className='payment-method-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.payment-method" />
                        </div>
                        <div className='payment-method'>
                            {this.renderPaymentMethod()}
                        </div>
                    </div>
                </div>
                {/* CHECK ORDER AGAIN */}
                <div className='check-order-again-container sharing-container'>
                    <div className='check-order-again-content sharing-content'>
                        <div className='check-order-again-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.check-order-again" />
                        </div>

                        <div className='check-order-again-list'>
                            {this.renderProductList()}
                        </div>
                    </div>
                </div>

                <div className='process-checkout-container'>
                    <div className='process-checkout-up-content'>
                        <div className='sharing-up-content'>
                            <label className='total-price-label'>
                                <FormattedMessage id="customer.cart.subtotal" />
                            </label>
                            <div className='total-price-text'>
                                <NumericFormat value={this.countTotalPrice()}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    suffix={'đ'} />
                            </div>
                        </div>
                        {/* <div className='sharing-up-content'>
                            <label className='total-price-label'>
                                <FormattedMessage id="customer.one-time-checkout.shipping-fee" />
                            </label>
                            <div className='total-price-text'>
                                31.000d
                            </div>
                        </div> */}
                        <div className='sharing-up-content'>
                            <label className='total-price-vat-label'>
                                <FormattedMessage id="customer.cart.grand-total" />
                            </label>
                            <div className='total-price-vat-text'>
                                <NumericFormat value={this.countTotalPrice()}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    suffix={'đ'} />
                            </div>
                        </div>
                    </div>

                    <div className='process-checkout-down-content'>
                        <div className='back-to-cart'
                            onClick={() => this.handleBackToCart()}>
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            <span><FormattedMessage id="customer.one-time-checkout.back-to-cart" />
                            </span>
                        </div>
                        <div className='process-checkout-btn'>
                            <button onClick={() => this.handleConfirm()}>
                                <FormattedMessage id="customer.one-time-checkout.confirmation" />
                            </button>
                        </div>
                    </div>
                </div>

                <AddNewAddressModal isOpenAddNewAddress={isOpenAddNewAddress}
                    closeAddNewAddress={this.handleCloseAddNewAddress} />
                {/* </React.Fragment > */}
            </LoadingOverlay>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        selectedProducts: state.user.selectedProducts,
        allCodesArr: state.admin.allCodesArr,
        actionResponse: state.admin.actionResponse,
        isFetchingData: state.admin.isFetchingData,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        createNewBill: (inputData) => dispatch(actions.createNewBill(inputData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OneStepCheckout));
