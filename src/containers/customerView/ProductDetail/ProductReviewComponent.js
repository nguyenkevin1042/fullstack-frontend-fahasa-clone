import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductReviewComponent.scss';
import starIconGray from '../../../assets/images/ico_star_gray.svg'
// import * as actions from "../store/actions";

import { Progress } from 'antd';

class ProductReviewComponent extends Component {
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
        let { isLoggedIn } = this.props
        console.log(isLoggedIn)
        return (
            <div className='review-product-container'>
                <div className='review-product-content'>
                    <div className='review-product-header'>
                        <FormattedMessage id="customer.product-detail.review-product" />
                    </div>

                    <div className='review-product-rating-section row'>
                        <div className='overall-rating col-4 col-lg-2'>
                            <p className='text-bold'><span>0</span>/5</p>
                            <p className='stars-icon'>
                                <img src={starIconGray} alt='star' />
                                <img src={starIconGray} alt='star' />
                                <img src={starIconGray} alt='star' />
                                <img src={starIconGray} alt='star' />
                                <img src={starIconGray} alt='star' />
                            </p>
                            <p>(2 đánh giá)</p>
                        </div>
                        <div className='each-star-rating col-8 col-lg-4'>
                            <ul >
                                <li className='sharing-star-rating row'>
                                    <p className='col-2'>5 sao</p>
                                    <Progress className=' col-10' status="normal" percent={100} strokeColor={'#F6A500'} />
                                </li>
                                <li className='sharing-star-rating row'>
                                    <p className='col-2'>4 sao</p>
                                    <Progress className=' col-10' status="normal" percent={0} strokeColor={'#F6A500'} />
                                </li>
                                <li className='sharing-star-rating row'>
                                    <p className='col-2'>3 sao</p>
                                    <Progress className=' col-10' status="normal" percent={0} strokeColor={'#F6A500'} />
                                </li>
                                <li className='sharing-star-rating row'>
                                    <p className='col-2'>2 sao</p>
                                    <Progress className=' col-10' status="normal" percent={0} strokeColor={'#F6A500'} />
                                </li>
                                <li className='sharing-star-rating row'>
                                    <p className='col-2'>1 sao</p>
                                    <Progress className=' col-10' status="normal" percent={0} strokeColor={'#F6A500'} />
                                </li>
                            </ul>

                        </div>
                        <div className='write-review-section col-12 col-lg-6'>
                            {isLoggedIn === true ?
                                <></> :
                                <p>
                                    Chỉ có thành viên mới có thể viết nhận xét.Vui lòng đăng nhập hoặc đăng ký.
                                </p>}
                        </div>
                    </div>



                </div >
            </div >
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductReviewComponent));
