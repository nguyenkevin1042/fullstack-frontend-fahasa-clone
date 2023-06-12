import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './Cart.scss';
import * as actions from "../../../store/actions";

import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import NumericFormat from 'react-number-format';
import ChangingQuantityComponent from '../components/ChangingQuantityComponent';
import CartItem from './CartItem';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProductTotalPrice: '',
            listProductInCart: []
        };
    }

    async componentDidMount() {
        if (this.props.userInfo) {
            await this.props.getCartByUserId(this.props.userInfo.id)
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.userInfo !== this.props.userInfo
            || prevProps.lang !== this.props.lang) {
            await this.props.getCartByUserId(this.props.userInfo.id)
        }

        if (prevProps.cartData !== this.props.cartData) {
            this.setState({
                listProductInCart: this.props.cartData
            })
        }
    }

    // countTotalPrice =()=>{
    //     let {cartData}=this.props

    // }

    eventhandler = (data) => {
        // console.log(data)
        // this.setState({
        //     quantityValue: data.value
        // })
    }

    handleDeleteItem = async (item) => {
        await this.props.deleteProductInCart(item.cartId, item.productId)
        await this.props.getCartByUserId(this.props.userInfo.id)
    }

    handleCheckAllProducts = (event) => {
        console.log(event.target.checked)
    }

    getTotalPriceAllProduct = (data) => {
        console.log('getTotalPriceAllProduct: ', data)
    }

    renderLeftContent = () => {
        let { listProductInCart } = this.state

        return (
            <>
                <table>
                    <div className='left-content-up'>
                        <tr className='row'>
                            <th className='col-xl-1'>
                                <input type="checkbox" id="check-all" name="check-all"
                                    onClick={(event) => this.handleCheckAllProducts(event)} />
                            </th>
                            <th className='col-xl-6'>
                                <label for="choose-all">
                                    <FormattedMessage id="customer.cart.choose-all" />
                                </label>
                            </th>
                            <th className='col-xl-2'>
                                <label>
                                    Số lượng
                                </label>
                            </th>
                            <th className='col-xl-2'>
                                <label>
                                    Thành tiền
                                </label>
                            </th>
                            <th className='col-xl-1'></th>
                        </tr>
                    </div>

                    <div className='left-content-down'>
                        {listProductInCart && listProductInCart.length > 0 &&
                            listProductInCart.map((item, index) =>
                            (<CartItem key={index} productInCart={item}
                                onChange={this.eventhandler}
                                getTotalPriceAllProduct={this.getTotalPriceAllProduct} />)

                            )

                        }

                    </div>

                </table>
            </>
        )
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

    render() {
        return (
            <React.Fragment>
                <Header />

                <div className='cart-container'>
                    <div className='row'>
                        <div className='cart-left-content col-xl-8'>
                            {this.renderLeftContent()}

                        </div>

                        <div className='cart-right-content col-xl-4'>
                            <div className='sharing-right-content'>
                                <div className='total-price-label'>
                                    Thành tiền
                                </div>
                                <div className=''>

                                </div>
                            </div>
                            <div className='sharing-right-content'>
                                <div className='total-price-vat-label'>
                                    Tổng Số Tiền (gồm VAT)
                                </div>
                                <div className=''>

                                </div>
                            </div>
                        </div>

                    </div>
                </div >

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
        cartData: state.user.cartData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),
        deleteProductInCart: (inputCartId, inputProductId) => dispatch(actions.deleteProductInCart(inputCartId, inputProductId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
