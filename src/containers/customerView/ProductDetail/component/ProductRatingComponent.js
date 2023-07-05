import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductRatingComponent.scss'
import starIconGray from '../../../../assets/images/ico_star_gray.svg'
import starIconYellow from '../../../../assets/images/ico_star_yellow.svg'

import * as actions from "../../../../store/actions";
import CommonUtils from '../../../../utils/CommonUtils';

class ProductRatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRating: [],
            listReviews: []
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('rating')
        await this.props.getReviewByProductId(this.props.productId)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allReviewsArr !== this.props.allReviewsArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "rating");

            let index = CommonUtils.getTotalRating(this.props.allReviewsArr, 'all')

            this.setState({
                listRating: CommonUtils.getRatingList(dataSelect, index),
                listReviews: this.props.allReviewsArr
            })
        }

        if (prevProps.productId !== this.props.productId) {
            await this.props.fetchAllCodesByType('rating')
            await this.props.getReviewByProductId(this.props.productId)
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "rating");

            let index = CommonUtils.getTotalRating(this.props.allReviewsArr, 'all')

            this.setState({
                listRating: CommonUtils.getRatingList(dataSelect, index),
                listReviews: this.props.allReviewsArr
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

    render() {
        let { listRating, listReviews } = this.state

        return (
            <React.Fragment>
                {listRating && listRating.length > 0 &&
                    listRating.map((item, index) => {
                        return (
                            <img key={item.id}
                                src={item.isSelected === true ? starIconYellow : starIconGray}
                                alt='star' />
                        )
                    })}

                <p>&#40;{listReviews.length} đánh giá&#41;</p>
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        allReviewsArr: state.user.allReviewsArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        getReviewByProductId: (inputProductId) => dispatch(actions.getReviewByProductId(inputProductId)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductRatingComponent));
