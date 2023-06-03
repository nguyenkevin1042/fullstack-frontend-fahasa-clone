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
import { languages } from '../../../utils';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityValue: 1,
            bookDescriptionData: ''
        };
    }

    async componentDidMount() {
        await this.props.fetchProductByKeyName(this.props.match.params.keyName);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.product !== this.props.product) {
            this.setState({
                bookDescriptionData: this.props.product.bookDescriptionData
            })
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
        let language = this.props.lang
        console.log(this.formatPrice(price))

        return (
            <>
                <div className='product-price'>
                    <NumericFormat value={salePrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'đ'} />
                    {/* {salePrice} đ */}
                    {/* {language === languages.VI && (
                        <NumericFormat value={salePrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'} />
                    )} */}

                </div>

                <div className='product-discount-price'>
                    {/* {parseFloat(price)} */}
                    <NumericFormat value={parseFloat(price)}
                        displayType={'text'}
                        thousandSeparator={true}
                    />

                </div>

                <div className='discount'>-{discount}%</div>
            </>
        )

    }

    render() {
        let { quantityValue, bookDescriptionData } = this.state
        let { product } = this.props
        let imageBase64 = '';
        if (product.image) {
            imageBase64 = new Buffer(product.image, 'base64').toString('binary');
        }

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
                                    <button className='add-to-cart-btn'>Thêm vào giỏ hàng</button>
                                    <button className='buy-now-btn'>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className='product-detail-right col-xl-7'>
                            <div className='row'>
                                <div className='product-name col-xl-12'>{product.name}</div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Nhà cung cấp:</label>
                                    <a className='sharing-text'>{bookDescriptionData.supplier}</a>
                                </div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Tác giả:</label>
                                    <p className='sharing-text'>{bookDescriptionData.author}</p>
                                </div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Nhà xuất bản:</label>
                                    <p className='sharing-text'>{bookDescriptionData.publisher}</p>
                                </div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Hình thức bìa:</label>
                                    <p className='sharing-text'>Bìa mềm</p>
                                </div>

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
                                    <label className='quantity-label col-xl-3'>Số lượng:</label>
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
                    bookDescriptionData={bookDescriptionData} />

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
