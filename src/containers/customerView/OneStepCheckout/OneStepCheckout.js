import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './OneStepCheckout.scss';
import Header from '../components/Header';
import AddNewAddressModal from './AddNewAddressModal';

class OneStepCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAddNewAddress: false,
            demoArr: [
                { id: 1, text: 'One' },
                { id: 2, text: 'Two' },
                { id: 3, text: 'Three' },
                { id: 3, text: 'Four' }
            ]

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
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

    handleBackToCart = () => {
        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }


    render() {
        let { isOpenAddNewAddress, demoArr } = this.state

        // let index = demoArr.indexOf({ id: 2, text: 'Two' })
        demoArr = demoArr.filter(data => data.id !== 3)
        console.log(demoArr)
        // console.log(index)
        return (
            <React.Fragment>
                <Header />

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

                <div className='shipping-address-container sharing-container'>
                    <div className='shipping-address-content sharing-content'>
                        <div className='shipping-address-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.shipping-method" />
                        </div>


                    </div>
                </div>

                <div className='shipping-address-container sharing-container'>
                    <div className='shipping-address-content sharing-content'>
                        <div className='shipping-address-title sharing-title'>
                            <FormattedMessage id="customer.one-time-checkout.payment-method" />

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
                                500.000d
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
                                500.000d
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
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OneStepCheckout));
