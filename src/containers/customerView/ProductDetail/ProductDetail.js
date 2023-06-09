import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import './ProductDetail.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import PolicyComponent from '../components/PolicyComponent';
import ProductDescriptionComponent from './ProductDescriptionComponent';

import NumericFormat from 'react-number-format';
import * as actions from "../../../store/actions";

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityValue: 1,
            descriptionData: '',
            productType: ''
        };
    }

    async componentDidMount() {

        await this.props.fetchProductByKeyName(this.props.match.params.keyName);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.product !== this.props.product) {
            document.title = this.props.product.name
            if (this.props.product.stationaryDescriptionId) {
                this.setState({
                    descriptionData: this.props.product.stationaryDescriptionData,
                    productType: 'stationary'
                })
            }
            if (this.props.product.bookDescriptionId) {
                this.setState({
                    descriptionData: this.props.product.bookDescriptionData,
                    productType: 'book'
                })
            }
            if (this.props.product.toyDescriptionId) {
                this.setState({
                    descriptionData: this.props.product.toyDescriptionData,
                    productType: 'toy'
                })
            }
        }
    }

    handleIncreaseQuantityValue = () => {
        this.setState({
            quantityValue: this.state.quantityValue + 1
        })
    }

    handleDecreaseQuantityValue = () => {
        let result = this.state.quantityValue <= 1 ?
            1 : this.state.quantityValue - 1
        this.setState({
            quantityValue: result
        })
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    formatPrice = (price) => {
        let result = <NumericFormat value={parseFloat(price)}
            displayType={'text'}
            thousandSeparator={true} />
        return result;
    }

    renderProductPrice = (price, discount) => {
        let salePrice = price - ((price * discount) / 100);

        return (
            <>
                <div className='product-price'>
                    <NumericFormat value={salePrice}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        suffix={'đ'} />
                </div>

                {discount ?
                    <>
                        <div className='product-discount-price'>
                            <NumericFormat value={parseFloat(price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','} />
                        </div>

                        <div className='discount'>-{discount}%</div>
                    </> : <></>}

            </>
        )

    }

    renderBookDescription = (descriptionData) => {
        return (
            <>
                {descriptionData.supplier && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.supplier" />:</label>
                        <a className='sharing-text'>{descriptionData.supplier}</a>
                    </div>
                )}

                {descriptionData.author && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.author" />:</label>
                        <p className='sharing-text'>{descriptionData.author}</p>
                    </div>
                )}
                {descriptionData.publisher && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.publisher" />:</label>
                        <p className='sharing-text'>{descriptionData.publisher}</p>
                    </div>
                )}
                {descriptionData.bookLayout && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.book-layout" />:</label>
                        <p className='sharing-text'>Bìa mềm</p>
                    </div>
                )}

            </>
        )
    }

    renderStationaryDescription = (descriptionData) => {
        return (
            <>
                {descriptionData.supplier && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.supplier" />:</label>
                        <a className='sharing-text'>{descriptionData.supplier}</a>
                    </div>
                )}

                {descriptionData.brand && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.brand" />:</label>
                        <p className='sharing-text'>{descriptionData.brand}</p>
                    </div>
                )}

                {descriptionData.origin && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.origin" />:</label>
                        <p className='sharing-text'>{descriptionData.origin}</p>
                    </div>
                )}

            </>
        )
    }

    renderToyDescription = (descriptionData) => {
        return (
            <>
                {descriptionData.supplier && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.supplier" />:</label>
                        <a className='sharing-text'>{descriptionData.supplier}</a>
                    </div>
                )}

                {descriptionData.brand && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.brand" />:</label>
                        <p className='sharing-text'>{descriptionData.brand}</p>
                    </div>
                )}

                {descriptionData.origin && (
                    <div className='sharing-content col-xl-6'>
                        <label><FormattedMessage id="customer.product-detail.origin" />:</label>
                        <p className='sharing-text'>{descriptionData.origin}</p>
                    </div>
                )}

            </>
        )
    }

    render() {
        let { quantityValue, descriptionData, productType } = this.state
        let { product } = this.props
        let imageBase64 = '';
        if (product.image) {
            imageBase64 = new Buffer(product.image, 'base64').toString('binary');
        }

        console.log(product)
        return (
            <>
                <Header />

                <div className='product-detail-container'>

                    <div className='product-detail-section row'>
                        <div className='product-detail-left col-xl-5'>
                            <div className='row'>
                                <div className='col-xl-2'></div>
                                <div className='product-img col-xl-10'
                                    style={{
                                        backgroundImage: "url(" + imageBase64 + ")"
                                    }}>

                                </div>
                                <div className='product-action col-xl-12'>
                                    <button className='add-to-cart-btn'><FormattedMessage id="customer.product-detail.add-to-cart" /></button>
                                    <button className='buy-now-btn'><FormattedMessage id="customer.product-detail.buy-now" /></button>
                                </div>
                            </div>
                        </div>
                        <div className='product-detail-right col-xl-7'>
                            <div className='row'>
                                <div className='product-name col-xl-12'>{product.name}</div>
                                {productType === 'book' && this.renderBookDescription(descriptionData)}
                                {productType === 'stationary' && this.renderStationaryDescription(descriptionData)}
                                {productType === 'toy' && this.renderToyDescription(descriptionData)}

                                <div className='review col-xl-12'>Đánh giá</div>
                                <div className='flash-sale col-xl-12'>Flash Sale</div>

                                <div className='product-price-text col-xl-12'>
                                    {this.renderProductPrice(product.price, product.discount)}
                                </div>

                                <div className='col-xl-12'>
                                    <div className='row'>
                                        <label className='col-xl-3'>Thời gian giao hàng</label>
                                        <p className='col-xl-9 ml-0'>Giao hàng đến</p>
                                    </div>
                                </div>

                                <div className='col-xl-12'>
                                    <div className='row'>
                                        <label className='col-xl-3'>Chính sách đổi trả</label>
                                        <p className='col-xl-9'>
                                            Đổi trả sản phẩm trong 30 ngày
                                        </p>
                                    </div>
                                </div>

                                <div className='sharing-content col-xl-12'>
                                    <label className='quantity-label col-xl-3'><FormattedMessage id="customer.product-detail.quantity" />:</label>
                                    <div className='col-xl-9'>
                                        <div className='select-quantity'>
                                            <button onClick={() => this.handleDecreaseQuantityValue()}>-</button>
                                            <input type='number' value={quantityValue}
                                                onChange={(event) => this.handleOnChangeInput(event, 'quantityValue')} />
                                            <button onClick={() => this.handleIncreaseQuantityValue()}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <ProductDescriptionComponent
                    product={product}
                    descriptionData={descriptionData}
                    productType={productType} />

                <PolicyComponent />
                <SignUpNewletter />
                <Footer />

            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        product: state.user.product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductByKeyName: (inputKeyName) => dispatch(actions.fetchProductByKeyName(inputKeyName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
