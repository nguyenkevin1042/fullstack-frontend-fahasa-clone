import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './OneStepCheckout.scss';
import Header from '../components/Header';
import AddNewAddressModal from './AddNewAddressModal';
import NumericFormat from 'react-number-format';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";

class OneStepCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAddNewAddress: false,
            listProduct: [],
            listPayment: [],
            selectedPayment: ''
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('payment')

        this.setState({
            listProduct: JSON.parse(localStorage.getItem('selectedProducts'))
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataPayment = this.buildDataInputSelect(this.props.allCodesArr);
            this.setState({
                listPayment: dataPayment
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.valueVI;
                let labelEN = item.valueEN;

                obj.keyMap = item.keyMap;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });

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

    onChangeRadioValue = (event) => {
        this.setState({
            selectedPayment: event.target.value
        })
    }

    handleBackToCart = () => {
        if (this.props.history) {
            this.props.history.push("/cart");
        }
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
                {discount != 0 ?
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

    renderPaymentMethod = () => {
        let { listPayment } = this.state

        return (
            <>
                {listPayment && listPayment.length > 0 && (
                    listPayment.map((item, index) => (
                        <div key={index} className='payment-method-item'>
                            < input
                                type="radio"
                                value={item.keyMap}
                                name="productType"
                                onChange={(event) => this.onChangeRadioValue(event)} />
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
                            <div key={index} className={index == 0 ? 'product-item border-top-none' : 'product-item'}>
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
        let { isOpenAddNewAddress, listProduct, selectedPayment } = this.state
        let { selectedProducts } = this.props

        console.log(selectedPayment)
        return (
            <React.Fragment>
                <Header />
                {/* SHIPPING ADDRESS */}
                <div className='shipping-address-container sharing-container'>
                    <div className='shipping-address-content sharing-content'>
                        <div className='shipping-address-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.shipping-address" />
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
                <div className='shipping-method-container sharing-container'>
                    <div className='shipping-method-content sharing-content'>
                        <div className='shipping-method-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.shipping-method" />
                        </div>

                    </div>
                </div>
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
                        <div className='sharing-up-content'>
                            <label className='total-price-label'>
                                <FormattedMessage id="customer.one-time-checkout.shipping-fee" />
                            </label>
                            <div className='total-price-text'>
                                31.000d
                            </div>
                        </div>
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
                            <button>
                                <FormattedMessage id="customer.one-time-checkout.confirmation" />
                            </button>
                        </div>
                    </div>
                </div>


                <AddNewAddressModal isOpenAddNewAddress={isOpenAddNewAddress}
                    closeAddNewAddress={this.handleCloseAddNewAddress} />

            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        selectedProducts: state.user.selectedProducts,
        allCodesArr: state.admin.allCodesArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OneStepCheckout));
