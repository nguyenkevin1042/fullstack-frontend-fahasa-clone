import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Banner.scss';

import bannerUp1 from '../../../assets/banner/Fahasa_salethu3_w2_mainbanner_Slide_840x320.jpg';
import bannerUp2 from '../../../assets/banner/Slide_V1_840x320.jpg';
import bannerUp3 from '../../../assets/banner/ZaloPayT523_840x320_SlideBanner.jpg';
import bannerUp4 from '../../../assets/banner/TuSachThieuNhi_T423_Banner_Slide_840x320_1.jpg';
import bannerUp5 from '../../../assets/banner/Back2School_T523_mainbanner_840x320.png';
import bannerUp6 from '../../../assets/banner/PoticoT5_FAHASA\ 392x156\ .png';
import bannerUp7 from '../../../assets/banner/Gift_subbanner_392x156.jpg';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Banner extends Component {
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
        let settings = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendDots: dots => (
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px"
                    }}
                >
                    <ul style={{ margin: "0px" }}> {dots} </ul>
                </div>
            ),

        };

        return (
            <>
                <div className='banner-container'>
                    <div className='banner-content-up'>
                        <div className='row'>
                            <div className='banner-content-up-left col-md-12 col-lg-8 my-1'>
                                <Slider {...settings}>
                                    <img src={bannerUp1} className='img-fluid banner-border' />
                                    <img src={bannerUp2} className='img-fluid banner-border' />
                                    <img src={bannerUp3} className='img-fluid banner-border' />
                                    <img src={bannerUp4} className='img-fluid banner-border' />
                                    <img src={bannerUp5} className='img-fluid banner-border' />
                                </Slider>
                            </div>
                            <div className='banner-content-up-right col-lg-4 d-none d-lg-block'>
                                <img src={bannerUp6} className='img-fluid banner-border' />
                                <img src={bannerUp7} className='img-fluid banner-border my-2' />
                            </div>
                        </div>
                    </div>{/*End .banner-content-up*/}

                    {/* d-none d-md-block */}
                    <div className='banner-content-down container-fluid d-none d-md-block'>
                        <div className='row'>
                            <div className='banner-content-down-item banner-content-down-1 banner-border col-3'>

                            </div>

                            <div className='banner-content-down-item banner-content-down-2 banner-border col-3'>

                            </div>

                            <div className='banner-content-down-item banner-content-down-3 banner-border col-3'>

                            </div>

                            <div className='banner-content-down-item banner-content-down-4 banner-border col-3'>

                            </div>
                        </div>
                    </div>{/*End .banner-content-down*/}
                </div > {/*End .row*/}

            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
