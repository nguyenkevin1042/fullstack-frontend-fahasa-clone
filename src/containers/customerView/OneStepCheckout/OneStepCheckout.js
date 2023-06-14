import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './OneStepCheckout.scss';
import Header from '../components/Header';

class OneStepCheckout extends Component {
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

    handleBackToCart = () => {
        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }


    render() {
        return (
            <React.Fragment>
                <Header />

                <div className=''>
                </div>

                <div className='process-checkout-container'>
                    <div className='process-checkout-up-content'>
                        <div className='sharing-up-content'>
                            <div className='total-price-label'>
                                <FormattedMessage id="customer.cart.subtotal" />
                            </div>
                            <div className='total-price-text'>
                                500.000d
                            </div>
                        </div>
                        <div className='sharing-up-content'>
                            <div className='total-price-label'>
                                <FormattedMessage id="customer.one-time-checkout.shipping-fee" />
                            </div>
                            <div className='total-price-text'>
                                31.000d
                            </div>
                        </div>
                        <div className='sharing-up-content'>
                            <div className='total-price-vat-label'>
                                <FormattedMessage id="customer.cart.grand-total" />
                            </div>
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
