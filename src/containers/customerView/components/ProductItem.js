import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import './ProductItem.scss';
import NumericFormat from 'react-number-format';
import * as actions from "../../../store/actions";
import LoadingOverlay from 'react-loading-overlay'
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductRatingComponent from '../ProductDetail/component/ProductRatingComponent';

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {},
        };
    }

    async componentDidMount() {
        let id = this.props.productId;
        await this.props.fetchProductById(id);
        this.setState({
            productData: this.props.singleProduct
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.productId !== this.props.productId) {
            this.setState({
                productData: {}
            })
            let id = this.props.productId;
            await this.props.fetchProductById(id);
            this.setState({
                productData: this.props.singleProduct
            })
        }
    }

    handleRedirectToProductDetail = (productKeyName) => {
        if (this.props.history) {
            this.props.history.push("/product/" + productKeyName);
        }
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
                                decimalSeparator={','} />
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
        let { productData, isLoading } = this.state

        let imageBase64 = '';
        if (productData.image) {
            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
        }

        return (
            <React.Fragment>
                <LoadingOverlay
                    active={isLoading}
                    spinner={true}
                    text='Please wait...'>
                    <div className='sharing-product-item' id={productData.id}
                        title={productData.name}
                        onClick={() => this.handleRedirectToProductDetail(productData.keyName)}>
                        <div className='sharing-product-item-image'
                            style={{
                                backgroundImage: "url(" + imageBase64 + ")"
                            }}>
                            {productData.discount ?
                                <div className='discount'>{productData.discount}%</div>
                                : <></>}

                        </div>

                        <div className='sharing-product-item-text'>
                            <div className='item-name'>
                                {productData.name}
                            </div>
                            <div className='item-price-chapter'>
                                {this.renderProductPrice(productData.price, productData.discount)}

                                {productData.bookDescriptionData &&
                                    productData.bookDescriptionData.chapter ?
                                    <div className='item-chapter'>
                                        Tập {productData.bookDescriptionData.chapter}
                                    </div> : <></>}
                            </div>
                        </div>
                        {/* <div className='stars-icon-product-item'>
                            <ProductRatingComponent productId={productData.id}
                                onlyShowNumber={true} />
                        </div> */}

                    </div >
                </LoadingOverlay>
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        singleProduct: state.admin.singleProduct,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductById: (inputId) => dispatch(actions.fetchProductById(inputId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductItem));
