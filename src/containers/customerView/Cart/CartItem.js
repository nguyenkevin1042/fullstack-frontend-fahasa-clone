import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import ChangingQuantityComponent from '../components/ChangingQuantityComponent';
import NumericFormat from 'react-number-format';
import * as actions from "../../../store/actions";

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cartId: '',
            productId: '',
            quantity: '',
            productPrice: '',
            totalPrice: ''
        };
    }

    componentDidMount() {
        let { productInCart } = this.props
        let { discount, price } = productInCart.Product
        let salePrice = price - ((price * discount) / 100)
        let calTotal = discount ?
            ((price - ((price * discount) / 100)) * productInCart.quantity) : (price * productInCart.quantity);

        this.setState({
            id: productInCart.id,
            cartId: productInCart.cartId,
            productId: productInCart.productId,
            quantity: productInCart.quantity,
            productPrice: discount ? salePrice : price,
            totalPrice: calTotal
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { discount, price } = this.props.productInCart.Product
        let { quantity } = this.state
        let salePrice = price - ((price * discount) / 100)

        if (prevState.quantity !== this.state.quantity) {
            let calTotal = discount ?
                ((price - ((price * discount) / 100)) * quantity) : (price * quantity);
            this.setState({
                totalPrice: calTotal
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state);
                }
            })

            this.setState({
                totalPrice: calTotal
            })

        }

    }

    handleDeleteItem = async (item) => {
        await this.props.deleteProductInCart(item.cartId, item.productId)
        await this.props.getCartByUserId(this.props.userInfo.id)
    }

    handleToProductDetail = async (productKeyName) => {
        if (this.props.history) {
            this.props.history.push("/product/" + productKeyName);
        }
    }

    handleUpdateCartproduct = async (value) => {
        await this.props.updateCart({
            cartId: this.state.cartId,
            productId: this.state.productId,
            quantity: value,
            productPrice: this.state.productPrice
        })

    }

    eventhandler = (data) => {
        this.setState({
            quantity: data.value
        })
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
        let { productInCart } = this.props
        let { totalPrice } = this.state
        let imageBase64 = '';
        let product = productInCart.Product;
        if (product.image) {
            imageBase64 = new Buffer(product.image, 'base64').toString('binary');
        }

        return (
            <React.Fragment>
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
                            <div className='product-name'
                                onClick={() => this.handleToProductDetail(product.keyName)}>
                                {product.name}
                            </div>
                            <div className='product-price'>
                                {this.renderProductPrice(product.price, product.discount)}
                            </div>
                        </div>
                    </td>
                    <td className='col-xl-2'>
                        <ChangingQuantityComponent
                            quantityValue={productInCart.quantity}
                            onChange={this.eventhandler}
                            handleUpdateCartproduct={this.handleUpdateCartproduct} />
                    </td>
                    <td className='total-price-text col-xl-2'>
                        {/* <p className='total-price-text'> */}
                        <NumericFormat value={totalPrice}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            suffix={'đ'} />
                        {/* </p> */}
                    </td>
                    <td className='delete-action col-xl-1'>
                        <i className="fas fa-trash"
                            onClick={() => this.handleDeleteItem(productInCart)}></i>
                    </td>
                </tr>

            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        cartData: state.user.cartData,
        actionResponse: state.user.actionResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),
        deleteProductInCart: (inputCartId, inputProductId) => dispatch(actions.deleteProductInCart(inputCartId, inputProductId)),
        updateCart: (inputData) => dispatch(actions.updateCart(inputData)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));
