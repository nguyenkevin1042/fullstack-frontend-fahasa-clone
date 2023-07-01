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
import CartItem from './CartItem';
import LoadingOverlay from 'react-loading-overlay';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProductTotalPrice: '',
            listProductInCart: [],
            selectedProducts: [],
            listProductWillBuy: [],
            checkAll: false,
            isLoading: false,
            isCartEmpty: false
        };
    }

    async componentDidMount() {
        document.title = "Cart | Nguyenkevin1042's Fahasa Clone"
        if (this.props.userInfo) {
            await this.props.getCartByUserId(this.props.userInfo.id)
            this.setState({
                listProductInCart: this.props.cartData
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.lang !== this.props.lang) {
        //     if (this.props.userInfo) {
        //         await this.props.getCartByUserId(this.props.userInfo.id)
        //     }
        // }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevState.checkAll !== this.state.checkAll) {
            // if (this.state.checkAll === true) {
            //     let copyState = { ...this.state };
            //     copyState.listProductInCart.map(
            //         item => copyState.selectedProducts.push(item));
            //     this.setState({ ...copyState });
            // } else {
            //     this.setState({
            //         selectedProducts: []
            //     })
            // }
        }

        if (prevProps.cartData !== this.props.cartData) {
            if (this.props.cartData.length === 0) {
                this.setState({
                    isCartEmpty: true
                })
            } else {
                this.setState({
                    listProductInCart: this.props.cartData,
                    isCartEmpty: false
                })
            }

        }

        if (prevProps.userInfo !== this.props.userInfo) {
            if (this.props.userInfo) {
                await this.props.getCartByUserId(this.props.userInfo.id)
            } else {
                this.setState({
                    isCartEmpty: true
                })
            }
        }

        // if (prevProps.location !== this.props.location) {
        //     if (this.props.userInfo) {
        //         await this.props.getCartByUserId(this.props.userInfo.id)
        //         this.setState({
        //             listProductInCart: this.props.cartData
        //         })
        //     }
        // }
    }

    countTotalPrice = () => {
        let { selectedProducts } = this.state
        let totalPriceResult = 0
        selectedProducts.map(item => totalPriceResult += item.totalPrice);
        return totalPriceResult;
    }

    eventhandler = (data) => {
        // console.log(data)
        // let copyState = { ...this.state };
        // copyState.selectedProducts = copyState.selectedProducts.filter(item => item.id !== data.id);
        // copyState.selectedProducts.push(data);
        // this.setState({ ...copyState });
        // this.setState({
        //     quantityValue: data.value
        // })
    }

    handleDeleteItem = async (item) => {
        await this.props.deleteProductInCart(item.cartId, item.productId)
        await this.props.getCartByUserId(this.props.userInfo.id)
    }

    handleCheckAllProducts = (event) => {
        this.setState({
            checkAll: event.target.checked
        })
    }

    handleToOneStepCheckout = () => {
        this.props.toOneTimeCheckout(this.state.selectedProducts)
        if (this.props.history) {
            this.props.history.push("/onestepcheckout");
        }
    }

    handleAddSelectedProduct = (data) => {
        let copyState = { ...this.state };
        copyState.selectedProducts.push(data);
        this.setState({ ...copyState });
    }

    handleDeleteSelectedProduct = (data) => {
        let copyState = { ...this.state };
        copyState.selectedProducts = copyState.selectedProducts.filter(item => item.id !== data);
        this.setState({ ...copyState });
    }

    renderLeftContent = () => {
        let { listProductInCart, checkAll } = this.state

        return (
            <>

                <div className='left-content-up'>
                    <table>
                        <tr className='row'>
                            <th className='col-1'>
                                <input type="checkbox" id="check-all" name="check-all"
                                // onClick={(event) => this.handleCheckAllProducts(event)} 
                                />
                            </th>
                            <th className='col-xl-6'>
                                <label for="choose-all">
                                    <FormattedMessage id="customer.cart.choose-all" />
                                </label>
                            </th>
                            <th className='col-2 d-none d-lg-block'>
                                <label>
                                    <FormattedMessage id="customer.cart.quantity" />
                                </label>
                            </th>
                            <th className='col-2 d-none d-lg-block'>
                                <label>
                                    <FormattedMessage id="customer.cart.subtotal" />
                                </label>
                            </th>
                            <th className='col-1'></th>
                        </tr>
                    </table>
                </div>

                <div className='left-content-down'>
                    <table>
                        {listProductInCart && listProductInCart.length > 0 &&
                            listProductInCart.map((item, index) =>
                            (<CartItem key={item.id} productInCart={item}
                                onChange={this.eventhandler}
                                addItemToSelectedProducts={this.handleAddSelectedProduct}
                                deleteItemSelectedProducts={this.handleDeleteSelectedProduct}
                                checkAll={checkAll} />)
                            )
                        }
                    </table>
                </div>


            </>
        )
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


    renderIfHavingProduct = () => {
        let { selectedProducts } = this.state

        return (
            <div className='have-products-content container-fluid'>
                <div className='row'>
                    <div className='cart-left-content col-lg-8'>
                        {this.renderLeftContent()}

                    </div>

                    <div className='cart-right-content col-lg-4'>
                        <div className='sharing-right-content border-bottom'>
                            <div className='total-price-label'>
                                <FormattedMessage id="customer.cart.subtotal" />
                            </div>
                            <div className='total-price-text'>
                                <NumericFormat value={this.countTotalPrice()}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    suffix={'đ'} />
                            </div>
                        </div>
                        <div className='sharing-right-content'>
                            <div className='total-price-vat-label'>
                                <FormattedMessage id="customer.cart.grand-total" />
                            </div>
                            <div className='total-price-vat-text'>
                                <NumericFormat value={this.countTotalPrice()}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    suffix={'đ'} />
                            </div>
                        </div>
                        <div className='pay-check-btn'>
                            {selectedProducts && selectedProducts.length > 0 ?
                                < button className='click-allowed'
                                    onClick={() => this.handleToOneStepCheckout()}>
                                    <FormattedMessage id="customer.cart.checkout" />
                                </button>
                                :
                                <button className='click-not-allowed' disabled>
                                    <FormattedMessage id="customer.cart.checkout" />
                                </button>}
                        </div>
                    </div>
                </div >
            </div>
        )
    }

    renderIfNotHavingProduct = () => {
        return (
            <div className='no-products-content container-fluid'>
                <div className='no-products-img'>
                </div>
                <div className='no-products-text'>
                    <FormattedMessage id="customer.cart.no-products" />
                </div>
                <div className='shopping-now-btn'>
                    <button>
                        <FormattedMessage id="customer.cart.shopping-now" />
                    </button>
                </div>
            </div>
        )
    }

    render() {
        let { listProductInCart, isLoading, isCartEmpty } = this.state
        let { userInfo } = this.props

        console.log(this.props.cartData)

        return (
            <LoadingOverlay
                classNamePrefix='Fullscreen_'
                active={isLoading}
                spinner={true}
                text='Please wait...'>

                <Header />

                <div className='cart-container'>
                    {/* {userInfo && isCartEmpty === false ?
                        this.renderIfHavingProduct() : this.renderIfNotHavingProduct()} */}
                    {userInfo && isCartEmpty === false && listProductInCart && listProductInCart.length > 0 ?
                        this.renderIfHavingProduct() : this.renderIfNotHavingProduct()}
                </div >

                <SignUpNewletter />
                <Footer />
            </LoadingOverlay>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        cartData: state.user.cartData,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),
        deleteProductInCart: (inputCartId, inputProductId) => dispatch(actions.deleteProductInCart(inputCartId, inputProductId)),
        toOneTimeCheckout: (inputData) => dispatch(actions.toOneTimeCheckout(inputData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
