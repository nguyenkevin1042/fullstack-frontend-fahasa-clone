import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductDetail.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import PolicyComponent from '../components/PolicyComponent';
import ProductDescriptionComponent from './ProductDescriptionComponent';
// import * as actions from "../store/actions";

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityValue: 1
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

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

    render() {
        let { quantityValue } = this.state

        return (
            <>
                <Header />

                <div className='product-detail-container'>

                    <div className='product-detail-section row'>
                        <div className='product-detail-left col-xl-5'>
                            <div className='row'>
                                <div className='col-xl-2'></div>
                                <div className='product-img col-xl-10'>

                                </div>
                                <div className='product-action col-xl-12'>
                                    <button className='add-to-cart-btn'>Thêm vào giỏ hàng</button>
                                    <button className='buy-now-btn'>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className='product-detail-right col-xl-7'>
                            <div className='row'>
                                <div className='product-name col-xl-12'>Cây Cam Ngọt Của Tôi</div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Nhà cung cấp:</label>
                                    <a className='sharing-text'>Nhã Nam</a>
                                </div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Tác giả:</label>
                                    <p className='sharing-text'>José Mauro de Vasconcelos</p>
                                </div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Nhà xuất bản:</label>
                                    <p className='sharing-text'>NXB Hội Nhà Văn</p>
                                </div>
                                <div className='sharing-content col-xl-6'>
                                    <label>Hình thức bìa:</label>
                                    <p className='sharing-text'>Bìa mềm</p>
                                </div>

                                <div className='review col-xl-12'>Đánh giá</div>
                                <div className='flash-sale col-xl-12'>Flash Sale</div>

                                <div className='product-price-text col-xl-12'>
                                    <div className='product-price'>84.240 đ</div>
                                    <div className='product-discount-price'>108.000</div>
                                    <div className='discount'>-22%</div>
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

                <ProductDescriptionComponent />

                <PolicyComponent />
                <SignUpNewletter />
                <Footer />

            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
