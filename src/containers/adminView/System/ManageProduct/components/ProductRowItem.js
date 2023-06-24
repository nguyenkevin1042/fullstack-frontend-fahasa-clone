import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import * as actions from "../../../../../store/actions";
import { languages } from '../../../../../utils';
import NumericFormat from 'react-number-format';

class ProductRowItem extends Component {
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
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.productId !== this.props.productId) {
            let id = this.props.productId;
            await this.props.fetchProductById(id);
            this.setState({
                productData: this.props.singleProduct
            })
        }

    }

    handleEditProduct = (productData) => {
        let { editProduct } = this.props

        if (editProduct) {
            editProduct(productData)
        }
    }

    handleDeleteProduct = (productData) => {
        let { deleteProduct } = this.props

        if (deleteProduct) {
            deleteProduct(productData)
        }
    }

    renderCategoryOfProduct = (item) => {
        let language = this.props.lang
        let result = ''

        if (item != null) {
            let category = item.SubCategory.AllCode
            let subCategory = item.SubCategory
            let childCategory = item

            let categoryVI = category.valueVI
            let subCategoryVI = subCategory.valueVI
            let childCategoryVI = childCategory.valueVI

            let categoryEN = category.valueEN
            let subCategoryEN = subCategory.valueEN
            let childCategoryEN = childCategory.valueEN
            let rightArrow = String.fromCodePoint(parseInt(2192, 16))

            result = language === languages.VI ?
                categoryVI + rightArrow + subCategoryVI + rightArrow + childCategoryVI :
                categoryEN + rightArrow + subCategoryEN + rightArrow + childCategoryEN
        }

        return (
            <>{result}</>
        )
    }

    render() {
        let { productData } = this.state
        let { actions, discount, tag, price } = this.props
        let imageBase64 = '';
        if (productData.image) {
            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
        }

        let salePrice = productData.price - ((productData.price * productData.discount) / 100);

        return (
            <>
                <td>{productData.id}</td>
                <td className='product-img'>
                    <div className='img'
                        style={{
                            backgroundImage: "url(" + imageBase64 + ")"
                        }} /></td>
                <td>{this.renderCategoryOfProduct(productData.ChildCategory)}</td>
                <td>{productData.name}</td>
                {price === 'on' ?
                    <td>
                        <NumericFormat value={parseFloat(productData.price)}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            suffix={'đ'} />
                    </td> : <></>}


                {discount === 'on' ?
                    <>
                        <td>{productData.discount}</td>
                        <td>
                            <NumericFormat value={salePrice}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                        </td>
                    </>
                    : <></>}
                {/* {tag === 'on' ?
                        <td>{productData.discount}</td>
                    : <></>} */}

                {actions === 'off' ?
                    <></> :
                    <td>
                        <button className='btn-edit'
                            onClick={() => this.handleEditProduct(productData)}
                        > <i className="fas fa-pencil-alt"></i></button>
                        <button className='btn-delete'
                            onClick={() => this.handleDeleteProduct(productData)}
                        ><i className="fas fa-trash"></i></button>
                    </td>
                }


            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        singleProduct: state.admin.singleProduct
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductById: (inputId) => dispatch(actions.fetchProductById(inputId))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRowItem);
