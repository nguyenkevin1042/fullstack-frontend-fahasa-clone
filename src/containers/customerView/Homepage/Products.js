import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Products.scss';
// import * as actions from "../store/actions";
import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTag: ''
        };
    }

    componentDidMount() {
        let { headerArr } = this.props
        console.log(headerArr[0])
        this.setState({
            selectedTag: headerArr[0]
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    renderProductHeader = () => {
        let { headerArr } = this.props
        let { selectedTag } = this.state
        return (
            <>
                <div className='header-item-list'>
                    {headerArr && headerArr.length > 0 &&
                        headerArr.map((item, index) => (
                            <div className={selectedTag === item ? 'header-item-tag active' : 'header-item-tag'}
                                onClick={() => this.handleOnClickTag(item)}>
                                {item}
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    renderProductList = () => {
        let { headerArr } = this.props
        let { selectedTag } = this.state
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
                    {Array(7).fill(
                        this.renderAProduct())
                    }
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

    handleOnClickTag = (item) => {
        this.setState({
            selectedTag: item
        })
    }

    render() {

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
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
