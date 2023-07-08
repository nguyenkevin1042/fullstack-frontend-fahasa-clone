import React, { Component, useEffect, useCallback, useRef, useState, useLayoutEffect } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { Modal } from 'reactstrap'

import * as actions from "../../../../store/actions";
import { CommonUtils, languages } from '../../../../utils';
import NumericFormat from 'react-number-format';

import LoadingOverlay from 'react-loading-overlay'
import { Progress } from 'antd';

const ProductReviewDetailModal = (props) => {
    const { isOpenedReviewDetailModal, closeModal,
        productData, allReviewsArr } = props

    const [productId, setProductId] = useState(productData.id)
    const [reviewData, setReviewData] = useState(allReviewsArr)
    const [reviewLength, setReviewLength] = useState(allReviewsArr.length)

    let total1Star = CommonUtils.getTotalRating(reviewData, '1Star')
    let total2Star = CommonUtils.getTotalRating(reviewData, '2Star')
    let total3Star = CommonUtils.getTotalRating(reviewData, '3Star')
    let total4Star = CommonUtils.getTotalRating(reviewData, '4Star')
    let total5Star = CommonUtils.getTotalRating(reviewData, '5Star')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await props.getReviewByProductId(productData.id)
    //         setReviewData(allReviewsArr)
    //         setReviewLength(allReviewsArr.length)

    //     }
    //     fetchData();

    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            await props.getReviewByProductId(productData.id)
            setReviewData(allReviewsArr)
            setReviewLength(allReviewsArr.length)
        }
        fetchData();
    }, [productData, productId, allReviewsArr])




    return (
        <Modal isOpen={isOpenedReviewDetailModal}
            toggle={closeModal}
            size='md'
            centered>
            <div className='sharing-modal-container'>

                <div className='sharing-modal-header'>
                    Chi tiết đánh giá sản phẩm
                </div>

                <div className='row'>
                    <div className='col-12 form-group'>
                        <label><b>Tên sản phẩm</b></label>
                        <p>{productData.name}</p>
                    </div>
                    <div className='col-12 form-group'>
                        <label>Tổng số đánh giá</label>
                        <p>{reviewLength}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12 form-group'>
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
                </div>

                <div className='sharing-modal-buttons'>
                    <button className='cancel-btn'
                        onClick={closeModal}
                    >Thoát</button>
                </div>
            </div>
        </Modal>
    )
}

function useBeforeRender(callback) {
    // runs before render
    useLayoutEffect(() => {
        callback();
    }, []);
};

function useDidMount(callback) {
    // Replaces componentDidMount
    useEffect(() => {
        callback();
    }, []);
};

function useDidUpdate(callback, dependencies) {
    // Replaces componentDidMount
    useEffect(() => {
        callback();
    }, [dependencies]);
};

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allReviewsArr: state.user.allReviewsArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getReviewByProductId: (inputProductId) => dispatch(actions.getReviewByProductId(inputProductId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductReviewDetailModal));
