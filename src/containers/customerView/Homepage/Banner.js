import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Banner.scss';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

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
                    <div className='row'>

                        <div className='banner-content-up col-lg-12'>
                            <div className='banner-content-up-left'>
                                <Slider {...settings}>
                                    <div className='banner-content-up-left-1 banner-border'></div>
                                    <div className='banner-content-up-left-2 banner-border'></div>
                                    <div className='banner-content-up-left-3 banner-border'></div>
                                    <div className='banner-content-up-left-4 banner-border'></div>
                                    <div className='banner-content-up-left-5 banner-border'></div>
                                    <div className='banner-content-up-left-6 banner-border'></div>
                                </Slider>
                            </div>
                            <div className='banner-content-up-right'>
                                <div className='up banner-border'>

                                </div>
                                <div className='down banner-border'>

                                </div>
                            </div>
                        </div>{/*End .banner-content-up*/}

                        <div className='banner-content-down'>
                            <div className='banner-content-down-1 banner-border'>

                            </div>

                            <div className='banner-content-down-2 banner-border'>

                            </div>

                            <div className='banner-content-down-3 banner-border'>

                            </div>

                            <div className='banner-content-down-4 banner-border'>

                            </div>


                        </div>{/*End .banner-content-down*/}
                    </div> {/*End .row*/}
                </div> {/*End .banner-container*/}
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