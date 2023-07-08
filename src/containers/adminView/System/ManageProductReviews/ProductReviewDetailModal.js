import React, { Component, useEffect, useCallback, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
// import './ManageOrders.scss';
import { Modal } from 'reactstrap'

import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import CustomPagination from '../../../../components/CustomPagination';
import moment from 'moment';
import NumericFormat from 'react-number-format';

import LoadingOverlay from 'react-loading-overlay'
import { bindActionCreators } from 'redux';

const ProductReviewDetailModal = (props) => {
    const { isOpenedReviewDetailModal, closeModal,
        productData, allReviewsArr } = props

    const [listReviews, setListReviews] = useState([])




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
                        <p>{listReviews.length}</p>
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
