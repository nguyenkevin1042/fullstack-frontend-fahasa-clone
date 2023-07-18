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
import UserRatingComponent from './component/UserRatingComponent';
import { CommonUtils } from '../../../utils';
import ProductRatingComponent from './component/ProductRatingComponent';
import CustomPagination from '../../../components/CustomPagination';
import AccountModal from '../components/DropdownComponents/AccountModal';

class ProductReviewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWritingReviewModalOpened: false,
            listReviews: [],
            totalRatingScore: 0,
            message: '',

            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: "",

            isModalOpened: false,
            loadSignInForm: false,
            loadSignUpForm: false,

            isLoading: false
        };
    }

    async componentDidMount() {
        await this.props.getReviewByProductId(this.props.productId)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.productId !== this.props.productId) {
            await this.props.getReviewByProductId(this.props.productId)
        }

        if (prevProps.allReviewsArr !== this.props.allReviewsArr) {
            this.setState({
                listReviews: this.props.allReviewsArr,
                totalRatingScore: CommonUtils.getTotalRating(this.props.allReviewsArr, 'all')
            })
        }
    }

    handleOpenWritingReviewModal = () => {
        this.setState({
            isWritingReviewModalOpened: true
        })
    }

    handleCloseWritingReviewModal = async () => {
        this.setState({
            isWritingReviewModalOpened: false
        })
        await this.props.getReviewByProductId(this.props.productId)
    }

    handleOpenSignInModal = () => {
        this.setState({
            isModalOpened: true,
            loadSignInForm: true,
            loadSignUpForm: false,
        })
    }
    handleOpenSignUpModal = () => {
        this.setState({
            isModalOpened: true,
            loadSignInForm: false,
            loadSignUpForm: true,
        })
    }
    // handleCloseSignInSignUpModalAndOpenWriting = () => {
    //     this.setState({
    //         isModalOpened: false
    //     })
    // }

    handleOnChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
    };

    renderReviewData = (listReviews) => {
        return (
            <>
                {listReviews && listReviews.length > 0 &&
                    listReviews.map((item, index) => {
                        let reviewedDate = moment(item.reviewedDate).format('DD/MM/YYYY')

                        return (
                            <div className='customer-review-item row' key={item.id}>
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
                                    <UserRatingComponent rating={item.rating} />

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
        let { isWritingReviewModalOpened, listReviews,
            totalRatingScore, pageLimit, startIndex, endIndex,
            isModalOpened, loadSignInForm, loadSignUpForm } = this.state

        let total1Star = CommonUtils.getTotalRating(listReviews, '1Star')
        let total2Star = CommonUtils.getTotalRating(listReviews, '2Star')
        let total3Star = CommonUtils.getTotalRating(listReviews, '3Star')
        let total4Star = CommonUtils.getTotalRating(listReviews, '4Star')
        let total5Star = CommonUtils.getTotalRating(listReviews, '5Star')

        let rowsPerPage = [];

        rowsPerPage = listReviews.slice(startIndex, endIndex + 1);

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
                                <p className='text-bold'><span>{totalRatingScore}</span>/5</p>
                                <p className='stars-icon'>
                                    <ProductRatingComponent productId={productId} />
                                </p>
                            </div>
                            {/* RATING */}
                            <div className='each-star-rating col-8 col-lg-4'>
                                <ul >
                                    <li className='sharing-star-rating row'>
                                        <p className='col-2'>5 sao</p>
                                        <Progress className=' col-10' status="normal"
                                            percent={total5Star} strokeColor={'#F6A500'} />
                                    </li>
                                    <li className='sharing-star-rating row'>
                                        <p className='col-2'>4 sao</p>
                                        <Progress className=' col-10' status="normal"
                                            percent={total4Star} strokeColor={'#F6A500'} />
                                    </li>
                                    <li className='sharing-star-rating row'>
                                        <p className='col-2'>3 sao</p>
                                        <Progress className=' col-10' status="normal"
                                            percent={total3Star} strokeColor={'#F6A500'} />
                                    </li>
                                    <li className='sharing-star-rating row'>
                                        <p className='col-2'>2 sao</p>
                                        <Progress className=' col-10' status="normal"
                                            percent={total2Star} strokeColor={'#F6A500'} />
                                    </li>
                                    <li className='sharing-star-rating row'>
                                        <p className='col-2'>1 sao</p>
                                        <Progress className=' col-10' status="normal"
                                            percent={total1Star} strokeColor={'#F6A500'} />
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
                                        <FormattedMessage id="customer.product-detail.signin-or-signup.text-1" />
                                        <span className='action-text'
                                            onClick={() => this.handleOpenSignInModal()}>
                                            <FormattedMessage id="customer.product-detail.signin-or-signup.sign-in" />
                                        </span>
                                        <FormattedMessage id="customer.product-detail.signin-or-signup.text-2" />
                                        <span className='action-text'
                                            onClick={() => this.handleOpenSignUpModal()}>
                                            <FormattedMessage id="customer.product-detail.signin-or-signup.sign-up" />
                                        </span>
                                    </p>}
                            </div>
                            {/* ALL REVIEWS */}
                            <div className='list-reviews-section container-fluid'>
                                {this.renderReviewData(rowsPerPage)}

                                <CustomPagination
                                    totalRecords={listReviews.length}
                                    pageLimit={pageLimit || 5}
                                    initialPage={1}
                                    pagesToShow={6}
                                    onChangePage={this.handleOnChangePage} />
                            </div>
                        </div>



                    </div >
                </div >

                <WritingReviewModal isOpenedModal={isWritingReviewModalOpened}
                    closeModal={this.handleCloseWritingReviewModal}
                    productId={productId} />

                <AccountModal isModalOpened={isModalOpened}
                    loadSignInForm={loadSignInForm}
                    loadSignUpForm={loadSignUpForm}
                    closeAccountModal={this.handleCloseAccountModal} />
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
