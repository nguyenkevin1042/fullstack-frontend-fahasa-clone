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

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProductInCart: []
        };
    }

    async componentDidMount() {
        if (this.props.userInfo) {
            await this.props.getCartByUserId(this.props.userInfo.id)
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

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

    eventhandler = (data) => {
        this.setState({
            quantityValue: data.value
        })
    }

    handleDeleteItem = async (item) => {
        await this.props.deleteProductInCart(item.cartId, item.productId)
        await this.props.getCartByUserId(this.props.userInfo.id)
    }

    renderLeftContent = () => {
        let { listProductInCart } = this.state

        return (
            <>
                <table>
                    <div className='left-content-up'>
                        <tr className='row'>
                            <th className='col-xl-1'>
                                <input type="checkbox" id="choose-all" name="choose-all" checked />
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
                            listProductInCart.map((item, index) => {
                                let imageBase64 = '';
                                let product = item.Product;
                                if (product.image) {
                                    imageBase64 = new Buffer(product.image, 'base64').toString('binary');
                                }

                                return (
                                    <tr className='cart-item row'>
                                        <td className='col-xl-1'>
                                            <input type="checkbox" id="choose-all" name="choose-all" />
                                        </td>
                                        <td className='product-section col-xl-6'>
                                            <div className='product-img col-xl-3'
                                                style={{
                                                    backgroundImage: "url(" + imageBase64 + ")"
                                                }}>

                                            </div>

                                            <div className='product-name-price col-xl-9'>
                                                <div className='product-name'>
                                                    {product.name}
                                                </div>
                                                <div className='product-price'>
                                                    {this.renderProductPrice(product.price, product.discount)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='col-xl-2'>
                                            <ChangingQuantityComponent quantityValue={item.quantity}
                                                onChange={this.eventhandler} />
                                        </td>
                                        <td className='total-price-text col-xl-2'>
                                            {/* <p className='total-price-text'> */}
                                            <NumericFormat value={item.totalPrice}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                suffix={'đ'} />
                                            {/* </p> */}
                                        </td>
                                        <td className='delete-action col-xl-1'>
                                            <i className="fas fa-trash"
                                                onClick={() => this.handleDeleteItem(item)}></i>
                                        </td>
                                    </tr>
                                )
                            })

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
        console.log(this.state.listProductInCart)
        return (
            <React.Fragment>
                <Header />

                <div className='cart-container'>
                    <div className='row'>
                        <div className='cart-left-content col-xl-8'>
                            {this.renderLeftContent()}

                        </div>

                        <div className='cart-right-content col-xl-4'>

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
