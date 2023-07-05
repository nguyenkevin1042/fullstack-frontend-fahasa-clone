import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductReviewComponent.scss';
import starIconGray from '../../../assets/images/ico_star_gray.svg'
import starIconYellow from '../../../assets/images/ico_star_yellow.svg'

import WritingReviewModal from './modal/WritingReviewModal';
import * as actions from "../../../store/actions";

import moment from 'moment';


import { Progress } from 'antd';

class ProductReviewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWritingReviewModalOpened: false,
            listReviews: []
        };
    }

    componentDidMount() {
        this.props.getReviewByProductId(this.props.productId)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.productId !== this.props.productId) {
            this.props.getReviewByProductId(this.props.productId)
        }

        if (prevProps.allReviewsArr !== this.props.allReviewsArr) {
            this.setState({
                listReviews: this.props.allReviewsArr
            })
        }
    }

    handleOpenWritingReviewModal = () => {
        this.setState({
            isWritingReviewModalOpened: true
        })
    }

    handleCloseWritingReviewModal = () => {
        this.setState({
            isWritingReviewModalOpened: false
        })
        this.props.getReviewByProductId(this.props.productId)
    }

    renderReviewData = () => {
        let { listReviews } = this.state

        return (
            <>
                {listReviews && listReviews.length > 0 &&
                    listReviews.map((item, index) => {
                        let reviewedDate = moment(item.reviewedDate).format('DD/MM/YYYY')

                        return (
                            <div className='customer-review-item row'>
                                <div className='customer-name-review-date d-flex d-lg-block col-12 col-lg-2'>
                                    <p className='customer-name col-6 col-lg-12'>
                                        {item.isAnonymous === true ?
                                            <>
                                                <FormattedMessage id="customer.product-detail.anonymous-user" />
                                            </> :

                                            <>{item.reviewer}</>}
                                    </p>
                                    <p className='review-date col-6 col-lg-12'>{reviewedDate}</p>
                                </div>
                                <div className='customer-review-rating-text d-block col-12 col-lg-10'>
                                    <div className='stars-icon'>
                                        <img src={starIconYellow} alt='star' />
                                        <img src={starIconYellow} alt='star' />
                                        <img src={starIconYellow} alt='star' />
                                        <img src={starIconYellow} alt='star' />
                                        <img src={starIconYellow} alt='star' />
                                    </div>
                                    <div className='customer-review-text'>
                                        {item.reviewText}
                                    </div>
                                </div>
                                <div className='like-report col-12 d-flex'>
                                    <p>
                                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                        Thích
                                    </p>
                                    <p>
                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                        Báo cáo
                                    </p>

                                </div>
                            </div>
                        )
                    })

                }
            </>
        )
    }


    render() {
        let { isLoggedIn, productId } = this.props
        let { isWritingReviewModalOpened, listReviews } = this.state

        console.log(this.state.listReviews)

        return (
            <>
                <div className='review-product-container'>
                    <div className='review-product-content'>
                        <div className='review-product-header'>
                            <FormattedMessage id="customer.product-detail.review-product" />
                        </div>

                        <div className='review-product-rating-section row'>
                            {/* NAME & REVIEW DATE */}
                            <div className='overall-rating col-4 col-lg-2'>
                                <p className='text-bold'><span>0</span>/5</p>
                                <p className='stars-icon'>
                                    <img src={starIconGray} alt='star' />
                                    <img src={starIconGray} alt='star' />
                                    <img src={starIconGray} alt='star' />
                                    <img src={starIconGray} alt='star' />
                                    <img src={starIconGray} alt='star' />
                                </p>
                                <p>&#40;{listReviews.length} đánh giá&#41;</p>
                            </div>
                            {/* RATING */}
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
                            {/* MAKE A REVIEW BUTTON */}
                            <div className='write-review-section col-12 col-lg-6'>
                                {isLoggedIn === true ?
                                    <button onClick={() => this.handleOpenWritingReviewModal()}>
                                        <i className="fas fa-pencil-alt"></i>
                                        <FormattedMessage id="customer.product-detail.write-a-review" />
                                    </button> :
                                    <p>
                                        Chỉ có thành viên mới có thể viết nhận xét.Vui lòng đăng nhập hoặc đăng ký.
                                    </p>}
                            </div>
                            {/* ALL REVIEWS */}
                            <div className='list-reviews-section container-fluid'>
                                {this.renderReviewData()}
                                {/* <div className='customer-review-item row'>
                                    <div className='customer-name-review-date d-flex d-lg-block col-12 col-lg-2'>
                                        <p className='customer-name col-6 col-lg-12'>Bùi Minh Phượng</p>
                                        <p className='review-date col-6 col-lg-12'>20/4/2023</p>
                                    </div>
                                    <div className='customer-review-rating-text d-block col-12 col-lg-10'>
                                        <div className='stars-icon'>
                                            <img src={starIconYellow} alt='star' />
                                            <img src={starIconYellow} alt='star' />
                                            <img src={starIconYellow} alt='star' />
                                            <img src={starIconYellow} alt='star' />
                                            <img src={starIconYellow} alt='star' />
                                        </div>
                                        <div className='customer-review-text'>
                                            Balo là một vật dụng không thể thiếu của học sinh và dường như cứ đến đầu năm học là phụ huynh lại đau đầu mua balo cho bé. Balo xinh xắn , màu sắc dễ thương, thiết kế đơn giản cho bé, các bé gái không ai không mê những mẫu balo thế này. Mua hàng ở Fahasa thì cực kì yên tâm, giá cả đúng với chất lượng, hơn hết chiếc balo thần thánh này còn giúp các bé chống gù lưng. Mình hay đi đón em và rất hay thấy hình ảnh những em bé vẫn còn rất nhỏ nhưng trên lưng thì vác những cặp rất to, trông các bé rất cực nhọc và lâu dần , việc lưng gù xuống sẽ là không kì lạ. Các phụ huynh cần có lựa chọn thông minh cho các bé , vì sự phát triển sau này của các con. Lựa chọn một sản phẩm vừa dễ thương vừa tốt cho lưng của các bé thì còn gì bằng nữa ạ.
                                        </div>
                                    </div>
                                    <div className='like-report col-12 d-flex'>
                                        <p>
                                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                            Thích
                                        </p>
                                        <p>
                                            <i className="fa fa-flag" aria-hidden="true"></i>
                                            Báo cáo
                                        </p>

                                    </div>
                                </div> */}
                            </div>
                        </div>



                    </div >
                </div >

                <WritingReviewModal isOpenedModal={isWritingReviewModalOpened}
                    closeModal={this.handleCloseWritingReviewModal}
                    productId={productId} />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        allReviewsArr: state.user.allReviewsArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getReviewByProductId: (inputProductId) => dispatch(actions.getReviewByProductId(inputProductId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductReviewComponent));
