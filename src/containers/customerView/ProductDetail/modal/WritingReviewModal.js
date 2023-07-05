import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './WritingReviewModal.scss';
import { Modal } from 'reactstrap'
import { languages } from '../../../../utils'
import { Switch } from 'antd';

import starIconGray from '../../../../assets/images/ico_star_gray.svg'
import starIconYellow from '../../../../assets/images/ico_star_yellow.svg'

import * as actions from "../../../../store/actions";

class WritingReviewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            reviewText: '',
            isAnonymous: false,
            listRating: [],
            selectedRating: ''
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('rating')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "rating");
            dataSelect[0].isSelected = true
            this.setState({
                listRating: dataSelect,
                selectedRating: dataSelect[0]
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            if (type === "rating") {
                inputData.map((item, index) => {
                    let obj = {};

                    obj.id = item.id;
                    obj.keyMap = item.keyMap;
                    obj.isSelected = false;

                    result.push(obj);
                });
            }
        }

        return result;
    }

    handSelectRating = (item) => {
        let tempList = this.state.listRating
        let selectedList, nonSelectedList, resultList
        let index = tempList.indexOf(item)

        this.setState({
            selectedRating: item
        })

        selectedList = tempList.slice(0, index).map(item => {
            item.isSelected = true
            return item
        })
        nonSelectedList = tempList.slice(index, tempList.length).map(item => {
            item.isSelected = false
            return item
        })

        resultList = [...selectedList, ...nonSelectedList]

        item.isSelected = !item.isSelected

        this.setState({
            selectedRating: item,
            listRating: resultList
        })
    }

    handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleOnChangeAnonymous = () => {
        this.setState({
            isAnonymous: !this.state.isAnonymous
        })
    }

    handleSendReview = async () => {
        let { productId, userInfo } = this.props
        let userId = userInfo.id
        let reviewedDate = Date.now();

        await this.props.createNewReview({
            productId: productId,
            userId: userId,
            customerName: this.state.customerName,
            reviewText: this.state.reviewText,
            isAnonymous: this.state.isAnonymous,
            selectedRating: this.state.selectedRating,
            reviewedDate: reviewedDate
        })

        if (this.props.actionResponse.errCode === 0) {
            this.props.closeModal()
        }
    }

    renderRatingView = (listRating) => {
        let { selectedRating } = this.state

        return (
            <>
                {listRating.map((item, index) =>

                    <img key={item.id}
                        src={item.id === selectedRating.id || item.isSelected === true ? starIconYellow : starIconGray}
                        onMouseOver={() => this.handSelectRating(item)}
                        alt='star' />

                )}
            </>
        )
    }

    render() {
        let { isOpenedModal, closeModal, lang } = this.props
        let { customerName, reviewText, listRating } = this.state

        return (
            <React.Fragment>
                <Modal isOpen={isOpenedModal}
                    toggle={closeModal}
                    size='lg'
                    centered>
                    <div className='writing-review-modal-container'>

                        <div className='writing-review-modal-header'>
                            <FormattedMessage id="customer.product-detail.write-a-review-modal.title" />
                        </div>

                        <div className='writing-review-modal-rating-section'>
                            {listRating && listRating.length > 0 &&
                                this.renderRatingView(listRating)
                            }
                        </div>

                        <div className='writing-review-modal-input-section'>
                            <div className='row'>
                                <div className='col-12 form-group'>
                                    <input className='form-control'
                                        placeholder={lang === languages.VI ?
                                            'Nhập tên sẽ hiển thị khi đánh giá' :
                                            'Type name will show in review'}
                                        id='customerName'
                                        value={customerName}
                                        onChange={(event) => this.handleOnChangeInput(event)} />
                                </div>
                                <div className='col-12 form-group'>
                                    <textarea className='form-control'
                                        placeholder={lang === languages.VI ?
                                            'Nhập nhận xét của bạn về sản phẩm' :
                                            'Type your review about this product'}
                                        id='reviewText'
                                        value={reviewText}
                                        rows={4}
                                        onChange={(event) => this.handleOnChangeInput(event)} />
                                </div>
                                <div className='custom-toggle-anonymous'>
                                    <span>
                                        <FormattedMessage id="customer.product-detail.write-a-review-modal.anonymous" />
                                    </span>
                                    <Switch size="small"
                                        onChange={() => this.handleOnChangeAnonymous()} />
                                </div>
                            </div>
                        </div>

                        <div className='writing-review-modal-buttons'>
                            <button className='cancel-btn'
                                onClick={closeModal}>
                                <FormattedMessage id="customer.product-detail.write-a-review-modal.cancel" />
                            </button>
                            <button className='send-review-btn'
                                onClick={() => this.handleSendReview()}>
                                <FormattedMessage id="customer.product-detail.write-a-review-modal.send-review" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment >
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        userInfo: state.user.userInfo,
        actionResponse: state.user.actionResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        createNewReview: (inputData) => dispatch(actions.createNewReview(inputData)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WritingReviewModal));
