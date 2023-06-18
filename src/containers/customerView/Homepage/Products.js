import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Products.scss';
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { languages } from '../../../utils';
import NumericFormat from 'react-number-format';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTag: '',
            listTags: [],
            listProducts: []
        };
    }

    async componentDidMount() {
        let { tagData } = this.props

        this.setState({
            selectedTag: tagData[0],
            listProducts: tagData[0].ProductTags.map(item => item.Product)
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevState.selectedTag !== this.state.selectedTag) {
            // await this.props.getProductByTagKeyName(this.state.selectedTag.keyName)

            // this.setState({
            //     selectedTag: this.state.selectedTag,
            //     listProducts: this.state.selectedTag.ProductTags.map(item => item.Product)
            // })
            // console.log(prevState.selectedTag)
            // console.log(this.state.selectedTag.ProductTags.map(item => item.Product))
        }

        if (prevState.listProducts !== this.state.listProducts) {
            this.setState({
                listProducts: this.state.listProducts
            })
        }

        if (prevProps.allTagArr !== this.props.allTagArr ||
            prevProps.lang !== this.props.lang) {
            let dataTag = this.buildDataInputSelect(this.props.tagData);
            this.setState({
                listTags: dataTag,
                selectedTag: dataTag[0]
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            this.setState({
                listProducts: this.props.allProductArr
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.valueVI;
                let labelEN = item.valueEN;

                obj.keyName = item.keyName;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });
        }

        return result;
    }

    renderProductHeader = () => {
        let { selectedTag, listTags } = this.state
        let { tagData, lang } = this.props
        return (
            <>
                <div className='header-item-list'>
                    {/* {listTags && listTags.length > 0 &&
                        listTags.map((item, index) => (
                            <div className={selectedTag === item ? 'header-item-tag active' : 'header-item-tag'}
                                onClick={() => this.handleOnClickTag(item)}>
                                {item.label}
                            </div>
                        ))
                    } */}
                    {tagData && tagData.length > 0 &&
                        tagData.map((item, index) => (
                            <div className={selectedTag === item ? 'header-item-tag active' : 'header-item-tag'}
                                onClick={() => this.handleOnClickTag(item)}>
                                {lang === languages.VI ? item.valueVI : item.valueEN}
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    renderProductPrice = (price, discount) => {
        let salePrice = price - ((price * discount) / 100);
        return (
            <>
                {discount != 0 ?
                    <>
                        <div className='product-discount-price'>
                            <NumericFormat value={salePrice}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                suffix={'đ'} />
                            <span className='product-discount'>
                                -{discount}%
                            </span>
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
                        <div className='product-price'>
                            <NumericFormat value={parseFloat(price)}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','} />
                        </div>
                        s</>}
            </>
        )
    }

    renderProductList = () => {
        let { allProductArr } = this.props
        let { selectedTag, listProducts } = this.state
        let settings = {
            className: "products-list",
            dots: false,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            }]
        };

        return (
            <>
                <Slider {...settings} >
                    {listProducts && listProducts.length > 0 &&
                        listProducts.map((item, index) => {

                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }

                            return (
                                <div className='product-item' title={item.name} key={index}>
                                    <div className='product-image'
                                        style={{
                                            backgroundImage: "url(" + imageBase64 + ")"
                                        }}>
                                    </div>
                                    <div className='product-name'>
                                        {item.name}
                                    </div>
                                    <div className='product-price-text'>
                                        {this.renderProductPrice(item.price, item.discount)}

                                    </div>
                                </div >
                            )
                        })}
                </Slider>
            </>
        )
    }

    renderAProduct = () => {

        return (
            <div className='product-item' title='Sách Giáo Khoa Bộ Lớp 9 - Sách Bài Tập (Bộ 7 Cuốn) (2023)'>
                <div className='product-image'>
                </div>
                <div className='product-name'>
                    Sách Giáo Khoa Bộ Lớp 9 - Sách Bài Tập (Bộ 7 Cuốn) (2023)
                </div>
                <div className='product-price-text'>
                    <div className='product-discount-price'>
                        15.000d
                        <span className='product-discount'>
                            -61%
                        </span>
                    </div>
                    <div className='product-price'>
                        35.000d
                    </div>

                </div>
            </div >
        )
    }

    handleOnClickTag = async (item) => {
        console.log(item)
        this.setState({
            selectedTag: item,
            listProducts: item.ProductTags.map(item => item.Product)

        })
    }

    render() {

        let tempList = this.state.listTags
        // tempList = tempList.slice(0, 10)
        // console.log(this.state.listProducts)

        return (
            <div className='products-container'>
                <div className='products-header'>
                    {this.renderProductHeader()}
                </div>

                <div>
                    {this.renderProductList()}
                </div>

                <div className='more-product-btn col-12'>
                    <button>Xem Thêm</button>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allTagArr: state.admin.allTagArr,
        allProductArr: state.admin.allProductArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductByTagKeyName: (keyName) => dispatch(actions.getProductByTagKeyName(keyName)),
        getTagByType: (type) => dispatch(actions.getTagByType(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
