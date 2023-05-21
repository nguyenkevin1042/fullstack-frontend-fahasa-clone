import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './FlashSale.scss';
// import * as actions from "../store/actions";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class FlashSale extends Component {
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

    renderFlashSaleList = () => {
        let settings = {
            className: "flash-sale-list",
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
                        this.renderAFlashSaleProduct())
                    }
                </Slider>
            </>
        )
    }

    renderAFlashSaleProduct = () => {
        return (
            <div className='flash-sale-item' title='Shaman King - Tập 30 - Bìa Đôi'>
                <div className='flash-sale-item-image sold'>
                    <div className='discount'>50%</div>
                </div>
                <div className='flash-sale-item-text'>
                    <div className='item-name'>
                        Shaman King - Tập 30 - Bìa Đôi
                    </div>
                    <div className='item-price-chapter'>
                        <div className='item-discount-price'>
                            17.500
                        </div>
                        <div className='item-price'>
                            35.000
                        </div>
                        <div className='item-chapter'>
                            Tập 30
                        </div>
                    </div>
                    <div className='item-sold-process'>
                        Đã bán 0
                    </div>
                </div>
            </div >
        )
    }

    render() {

        return (
            <div className='flash-sale-container'>
                <div className='flash-sale-title'>
                    <div className='flash-sale-title-text'>
                        <div className='flash-sale-icon'></div>
                        <div className='flash-sale-text'>Flashsale</div>
                    </div>
                    <div className='flash-sale-time'>
                        {/* Need to code */}
                    </div>
                </div>

                <div>
                    {this.renderFlashSaleList()}
                </div>

                <div className='flash-sale-more-button'>
                    <button className='more-sale-product-btn'>Xem thêm</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);
