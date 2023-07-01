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
            totalPrice: '',
            productData: {}
        };
    }

    async componentDidMount() {
        let id = this.props.productInCart.productId;
        await this.props.fetchProductById(id);
        this.setState({
            productData: this.props.singleProduct
        })

        let { discount, price } = this.state.productData
        let { productInCart } = this.props
        let salePrice = price - ((price * discount) / 100)
        let calTotal = discount ?
            ((price - ((price * discount) / 100)) * productInCart.quantity) : (price * productInCart.quantity);

        this.setState({
            id: productInCart.id,
            cartId: productInCart.cartId,
            productId: productInCart.productId,
            quantity: productInCart.quantity,
            productPrice: discount ? salePrice : price,
            totalPrice: calTotal,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.productInCart !== this.props.productInCart) {
            this.setState({
                productData: {}
            })
            let id = this.props.productInCart.productId;
            await this.props.fetchProductById(id);
            this.setState({
                productData: this.props.singleProduct
            })
        }

        if (prevState.quantity !== this.state.quantity) {
            let { discount, price } = this.state.productData
            let { productInCart } = this.props

            let calTotal = discount ?
                ((price - ((price * discount) / 100)) * this.state.quantity)
                : (price * this.state.quantity);

            this.setState({
                id: productInCart.id,
                cartId: productInCart.cartId,
                productId: productInCart.productId,
                quantity: this.state.quantity,
                totalPrice: calTotal

            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.totalPrice);
                }
            })
        }
    }

    handleDeleteItem = async (item) => {
        let userId = this.props.userInfo.id
        await this.props.deleteProductInCart({
            userId: userId,
            cartId: item.cartId,
            productId: item.productId
        })
        await this.props.getCartByUserId(userId)
    }

    handleToProductDetail = async (productKeyName) => {
        if (this.props.history) {
            this.props.history.push("/product/" + productKeyName);
        }
    }

    handleUpdateCartProduct = async (value) => {
        let userId = this.props.userInfo.id

        await this.props.updateCart({
            userId: userId,
            cartId: this.state.cartId,
            productId: this.state.productId,
            quantity: value,
            productPrice: this.state.productPrice
        })

        await this.props.getCartByUserId(userId)
    }

    eventhandler = (data) => {
        this.setState({
            quantity: data.value
        })
    }

    handleCheckThisProduct = (event) => {
        let { addItemToSelectedProducts, deleteItemSelectedProducts } = this.props
        let data = {
            id: this.state.id,
            cartId: this.state.cartId,
            productId: this.state.productId,
            quantity: this.state.quantity,
            productPrice: this.state.productPrice,
            totalPrice: this.state.totalPrice,
        }

        if (event.target.checked === true) {
            addItemToSelectedProducts(this.state)
        }

        if (event.target.checked === false) {
            deleteItemSelectedProducts(data.id)
        }
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
        let { productInCart, checkAll } = this.props
        let { totalPrice, productData } = this.state

        let imageBase64 = '';
        if (productData.image) {
            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
        }

        return (
            <React.Fragment>
                <tr className='cart-item row'>
                    <td className='col-1 col-xl-1'>
                        {checkAll == true ?
                            <input type="checkbox" id="choose" name="choose"
                                onClick={(event) => this.handleCheckThisProduct(event)}
                                checked />
                            :
                            <input type="checkbox" id="choose" name="choose"
                                onClick={(event) => this.handleCheckThisProduct(event)} />}
                    </td>
                    <td className='product-section col-5 col-xl-6'>
                        <div className='product-img col-xl-3'
                            style={{
                                backgroundImage: "url(" + imageBase64 + ")"
                            }}>

                        </div>

                        <div className='product-name-price col-xl-9'>
                            <div className='product-name'
                                onClick={() => this.handleToProductDetail(productData.keyName)}>
                                {productData.name}
                            </div>
                            <div className='product-price'>
                                {this.renderProductPrice(productData.price, productData.discount)}
                            </div>
                        </div>
                    </td>
                    <td className='col-3 col-xl-2'>
                        <ChangingQuantityComponent
                            quantityValue={productInCart.quantity}
                            onChange={this.eventhandler}
                            handleUpdateCartProduct={this.handleUpdateCartProduct} />
                    </td>
                    <td className='total-price-text col-2 col-xl-2'>
                        <NumericFormat value={totalPrice}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            suffix={'đ'} />
                    </td>
                    <td className='delete-action col-1 col-xl-1'>
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
        singleProduct: state.admin.singleProduct,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),
        deleteProductInCart: (inputData) => dispatch(actions.deleteProductInCart(inputData)),
        updateCart: (inputData) => dispatch(actions.updateCart(inputData)),
        fetchProductById: (inputId) => dispatch(actions.fetchProductById(inputId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));
