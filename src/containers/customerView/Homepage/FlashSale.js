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

                <div className='flash-sale-content'>
                    {/* <div className='row'> */}
                    {/* <Slider {...settings}>

                        {Array(10).fill(<p>number</p>)
                        }
                    </Slider> */}

                    {/* <Slider {...settings}>
                            <div className='flash-sale-item col-4 col-xl-2'>
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
                            </div>

                    
                        </Slider> */}

                    {/* <Slider {...settings}>

                            {Array(10).fill(
                                <div className='flash-sale-item col-4 col-xl-2'>
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
                                </div>)
                            }
                        </Slider> */}
                    {/* <div className='container'>
                        <div className='row'>
                            <Slider {...settings}>
                                {this.getButtonsUsingMap()}
                            </Slider>
                        </div>
                    </div> */}
                    <div className='flash-sale-item col-4 col-xl-2'>
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
                    </div>

                    <div className='flash-sale-more-button'>
                        <button className='more-sale-product-btn'>Xem thêm</button>
                    </div>

                    {/* </div> */}
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
