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
                        <th>Mã hàng</th>
                        <td>{product.id}</td>
                    </tr>
                    <tr>
                        <th>Tên Nhà Cung Cấp</th>
                        <td className='supplier-name'>{bookDescriptionData.supplier}</td>
                    </tr>
                    <tr>
                        <th>Tác giả</th>
                        <td>{bookDescriptionData.author}</td>
                    </tr>
                    <tr>
                        <th>Người Dịch</th>
                        <td>{bookDescriptionData.translator}</td>
                    </tr>
                    <tr>
                        <th>NXB</th>
                        <td>{bookDescriptionData.publisher}</td>
                    </tr>
                    <tr>
                        <th>Năm XB</th>
                        <td>{product.publishYear}</td>
                    </tr>
                    <tr>
                        <th>Trọng lượng (gr)</th>
                        <td>{product.weight}</td>
                    </tr>
                    <tr>
                        <th>Kích thước</th>
                        <td>{this.renderProductSize(product.length, product.width, product.height)} cm</td>
                    </tr>
                    <tr>
                        <th>Số Trang</th>
                        <td>{bookDescriptionData.pages}</td>
                    </tr>
                    <tr>
                        <th>Hình thức</th>
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
                        {showLess === true ? 'Xem thêm' : 'Rút gọn'}
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
                        Thông tin sản phẩm
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
