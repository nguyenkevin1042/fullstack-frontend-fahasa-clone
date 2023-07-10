import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './BrandSection.scss';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cambridgeLogo from '../../../assets/brand/cambridge.jpg'
import cengageLogo from '../../../assets/brand/cengage.jpg'
import harperCollinsLogo from '../../../assets/brand/Harper-Collins.jpg'
import hachetteLogo from '../../../assets/brand/hachette.jpg'
import mcGrawHillLogo from '../../../assets/brand/macgrawhill.jpg'
import macMillanLogo from '../../../assets/brand/macmilan.jpg'
import oxfordLogo from '../../../assets/brand/oxford-02.jpg'
import parragonLogo from '../../../assets/brand/paragon.jpg'
import pearsonLogo from '../../../assets/brand/PearsonLogo_Avatar.png'
import penguinLogo from '../../../assets/brand/penguin.jpg'
import sterlingLogo from '../../../assets/brand/sterling.jpg'
import usborneLogo from '../../../assets/brand/usborn.jpg'
import scholasticLogo from '../../../assets/brand/Scholastic-bar-logo.png'
import savvasLogo from '../../../assets/brand/savvas_logo_bqv2-01.png'

class BrandSection extends Component {
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
            dots: false,
            infinite: true,
            slidesToShow: 9,
            slidesToScroll: 4,
        };
        return (
            <div className='brand-section-container'>
                <div className='brand-section-content'>

                    <Slider {...settings} >
                        <img src={cambridgeLogo} alt={'cambridgeLogo'} className='brand-logo img-fluid' />
                        <img src={cengageLogo} alt={'cengageLogo'} className='brand-logo img-fluid' />
                        <img src={harperCollinsLogo} alt={'harperCollinsLogo'} className='brand-logo img-fluid' />
                        <img src={hachetteLogo} alt={'hachetteLogo'} className='brand-logo img-fluid' />
                        <img src={mcGrawHillLogo} alt={'mcGrawHillLogo'} className='brand-logo img-fluid' />
                        <img src={macMillanLogo} alt={'macMillanLogo'} className='brand-logo img-fluid' />
                        <img src={oxfordLogo} alt={'oxfordLogo'} className='brand-logo img-fluid' />
                        <img src={parragonLogo} alt={'parragonLogo'} className='brand-logo img-fluid' />
                        <img src={pearsonLogo} alt={'pearsonLogo'} className='brand-logo img-fluid' />
                        <img src={penguinLogo} alt={'penguinLogo'} className='brand-logo img-fluid' />
                        <img src={sterlingLogo} alt={sterlingLogo} className='brand-logo img-fluid' />
                        <img src={usborneLogo} alt={'usborneLogo'} className='brand-logo img-fluid' />
                        <img src={scholasticLogo} alt={'scholasticLogo'} className='brand-logo img-fluid' />
                        <img src={savvasLogo} alt={'savvasLogo'} className='brand-logo img-fluid' />
                    </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrandSection));
