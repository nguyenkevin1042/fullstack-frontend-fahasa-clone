import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductDescriptionComponent.scss';
import { languages } from '../../../utils';

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


    renderBookDescription = (product, descriptionData) => {
        let { lang } = this.props
        return (
            <>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.product-id" /></th>
                    <td>{product.id}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.supplier" /></th>
                    <td className='supplier-name'>{descriptionData.supplier}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.author" /></th>
                    <td>{descriptionData.author}</td>
                </tr>
                {descriptionData.translator && (
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.translator" /></th>
                        <td>{descriptionData.translator}</td>
                    </tr>
                )}

                {descriptionData.publisher ?
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.publisher" /></th>
                        <td>{descriptionData.publisher}</td>
                    </tr> : <></>}


                {product.publishYear ?
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.publish-year" /></th>
                        <td>{product.publishYear}</td>
                    </tr> : <></>}


                {product.weight ?
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.weight" /> (gr)</th>
                        <td>{product.weight}</td>
                    </tr> : <></>}

                {descriptionData.language ?
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.language" /></th>
                        <td>{descriptionData.language}</td>
                    </tr>
                    : <></>}

                <tr>
                    <th><FormattedMessage id="customer.product-detail.size" /></th>
                    <td>{this.renderProductSize(product.length, product.width, product.height)} cm</td>
                </tr>

                {descriptionData.pages ?
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.pages" /></th>
                        <td>{descriptionData.pages}</td>
                    </tr>
                    : <></>}

                {product.AllCode ?
                    <tr>
                        <th><FormattedMessage id="customer.product-detail.book-layout" /></th>
                        <td>{lang === languages.VI ?
                            product.AllCode.valueVI : product.AllCode.valueEN}</td>
                    </tr>
                    : <></>}

            </>
        )
    }

    renderStationaryDescription = (product, descriptionData) => {
        return (
            <>
                <tr >
                    <th><FormattedMessage id="customer.product-detail.product-id" /></th>
                    <td>{product.id}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.brand" /></th>
                    <td className='supplier-name'>{descriptionData.brand}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.origin" /></th>
                    <td>{descriptionData.origin}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.madeBy" /></th>
                    <td>{descriptionData.madeBy}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.color" /></th>
                    <td>{descriptionData.color}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.material" /></th>
                    <td>{descriptionData.material}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.weight" /> (gr)</th>
                    <td>{product.weight}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.size" /></th>
                    <td>{this.renderProductSize(product.length, product.width, product.height)} cm</td>
                </tr>
            </>
        )
    }

    renderToyDescription = (product, descriptionData) => {
        return (
            <>
                <tr >
                    <th><FormattedMessage id="customer.product-detail.product-id" /></th>
                    <td>{product.id}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.age" /></th>
                    <td className='supplier-name'>{descriptionData.age}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.supplier" /></th>
                    <td>{descriptionData.supplier}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.brand" /></th>
                    <td>{descriptionData.brand}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.origin" /></th>
                    <td>{descriptionData.origin}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.madeBy" /></th>
                    <td>{descriptionData.madeBy}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.color" /></th>
                    <td>{descriptionData.color}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.material" /></th>
                    <td>{descriptionData.material}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.specification" /></th>
                    <td>{descriptionData.specification}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.warning" /></th>
                    <td>{descriptionData.warning}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.usage" /></th>
                    <td>{descriptionData.usage}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.weight" /> (gr)</th>
                    <td>{product.weight}</td>
                </tr>
                <tr>
                    <th><FormattedMessage id="customer.product-detail.size" /></th>
                    <td>{this.renderProductSize(product.length, product.width, product.height)} cm</td>
                </tr>

            </>
        )
    }

    renderProductSize = (length, width, height) => {
        let lengthValue = parseFloat(length)
        let widthValue = parseFloat(width)
        let heightValue = height === 0 ? '' : ' x ' + parseFloat(height);
        return (
            <>
                {lengthValue} x {widthValue} {heightValue}
            </>
        )
    }


    handleShowDescription = () => {
        this.setState({
            showLess: !this.state.showLess
        })
    }


    render() {
        let { showLess } = this.state
        let { product, descriptionData, productType } = this.props

        return (
            <div className='product-description-container'>
                <div className='product-description-content'>
                    <div className='description-header'>
                        <FormattedMessage id="customer.product-detail.product-detail" />
                    </div>
                    <div>
                        <table>
                            {productType === 'book' && this.renderBookDescription(product, descriptionData)}
                            {productType === 'stationary' && this.renderStationaryDescription(product, descriptionData)}
                            {productType === 'toy' && this.renderToyDescription(product, descriptionData)}
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
                    </div>
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
