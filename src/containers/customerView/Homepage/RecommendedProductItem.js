import React, { Component } from 'react';
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import NumericFormat from 'react-number-format';
import { LazyLoadImage } from "react-lazy-load-image-component";


class RecommendedProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {},
            isLoading: false,
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
            let id = this.props.productId;
            await this.props.fetchProductById(id);
            this.setState({
                productData: this.props.singleProduct
            })
        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
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
                        <div className='product-discount-price'>
                            <NumericFormat value={salePrice}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                            {discount &&
                                <span className='product-discount'>
                                    -{discount}%
                                </span>}

                        </div>
                        <div className='product-price'>
                            <NumericFormat value={parseFloat(price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','} />
                        </div>
                    </>
                    :
                    <>
                        <div className='product-discount-price'>
                            <NumericFormat value={parseFloat(price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','} />
                        </div>
                    </>}
            </>
        )
    }


    render() {
        let { productData, isLoading } = this.state

        let imageBase64 = '';
        if (productData && productData.image) {
            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
        }
        return (
            <React.Fragment>
                {productData &&
                    <div className='product-item' title={productData.name}
                        onClick={() => this.handleRedirectToProductDetail(productData.keyName)} >
                        <div className='product-image'
                            style={{
                                backgroundImage: "url(" + imageBase64 + ")"
                            }}>
                        </div>
                        {/* {imageBase64 &&
                            <LazyLoadImage src={imageBase64 ? imageBase64 : ''}
                                className='product-image'
                                alt="Image Alt"
                                effect="blur"
                            />} */}
                        <div className='product-name'>
                            {productData.name}
                        </div>
                        <div className='product-price-text'>
                            {this.renderProductPrice(productData.price, productData.discount)}
                        </div>
                    </div >}
            </React.Fragment >
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        singleProduct: state.admin.singleProduct,
        isFetchingData: state.admin.isFetchingData,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductById: (inputId) => dispatch(actions.fetchProductById(inputId))

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendedProductItem));
