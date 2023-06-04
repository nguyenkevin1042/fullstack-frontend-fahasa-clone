import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductDescriptionComponent.scss';
// import * as actions from "../store/actions";

class ProductDescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLess: true
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    renderProductSize = (length, width, height) => {
        let lengthValue = parseFloat(length)
        let widthValue = parseFloat(width)
        let heightValue = height == 0 ? '' : ' x ' + parseFloat(height);
        return (
            <>
                {lengthValue} x {widthValue} {heightValue}
            </>
        )
    }

    renderBookDescription = () => {
        let { showLess } = this.state
        let { product, bookDescriptionData } = this.props
        return (
            <>
                <table>
                    <tr >
                        <th><FormattedMessage id="customer.product-detail.product-id" /></th>
                        <td>{product.id}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.supplier" /></th>
                        <td className='supplier-name'>{bookDescriptionData.supplier}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.author" /></th>
                        <td>{bookDescriptionData.author}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.translator" /></th>
                        <td>{bookDescriptionData.translator}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.publisher" /></th>
                        <td>{bookDescriptionData.publisher}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.publish-year" /></th>
                        <td>{product.publishYear}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.weight" /> (gr)</th>
                        <td>{product.weight}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.size" /></th>
                        <td>{this.renderProductSize(product.length, product.width, product.height)} cm</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.pages" /></th>
                        <td>{bookDescriptionData.pages}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.book-layout" /></th>
                        <td>Bìa Mềm</td>
                    </tr>
                </table>

                <div className='about-product-price'>
                    Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,..
                </div>
                <div className={showLess === true ? 'about-product-text-less' : 'about-product-text-more'}>
                    {product.markdownData && product.markdownData.contentHTML &&
                        <div dangerouslySetInnerHTML={{ __html: product.markdownData.contentHTML }} />

                    }
                </div>

                <div className='show-hide-btn'>
                    <button onClick={() => this.handleShowDescription()}>
                        {showLess === true ?
                            <FormattedMessage id="customer.product-detail.more" /> :
                            <FormattedMessage id="customer.product-detail.less" />}
                    </button>
                </div>
            </>
        )
    }

    handleShowDescription = () => {
        this.setState({
            showLess: !this.state.showLess
        })
    }


    render() {

        return (
            <div className='product-description-container'>
                <div className='product-description-content'>
                    <div className='description-header'>
                        <FormattedMessage id="customer.product-detail.product-detail" />
                    </div>
                    {this.renderBookDescription()}

                </div>

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionComponent);
