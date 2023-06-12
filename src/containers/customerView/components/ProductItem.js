import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductItem.scss';
import { CommonUtils } from '../../../utils';
import NumericFormat from 'react-number-format';
// import * as actions from "../store/actions";

class ProductItem extends Component {
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

    handleRedirectToProductDetail = (productKeyName) => {
        if (this.props.history) {
            this.props.history.push("/product/" + productKeyName);
        }
    }

    renderProductPrice = (price, discount) => {
        let productData = this.props.productData
        let salePrice = productData.price - ((productData.price * productData.discount) / 100);
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
                            <NumericFormat value={parseFloat(productData.price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','} />
                        </div></>
                    :
                    <>
                        <div className='item-discount-price'>
                            <NumericFormat value={parseFloat(productData.price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                        </div></>}
            </>
        )
    }

    render() {
        let productData = this.props.productData

        let imageBase64 = '';
        if (productData.image) {
            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
        }

        return (
            <React.Fragment>
                <div className='sharing-product-item'
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

                            {productData.bookDescriptionData && productData.bookDescriptionData.chapter && (
                                <div className='item-chapter'>
                                    Tập {productData.bookDescriptionData.chapter}
                                </div>
                            )}

                        </div>
                    </div>
                </div >

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductItem));
