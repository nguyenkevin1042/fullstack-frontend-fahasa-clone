import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import starIconGray from '../../../../assets/images/ico_star_gray.svg'
import starIconYellow from '../../../../assets/images/ico_star_yellow.svg'

import * as actions from "../../../../store/actions";
import CommonUtils from '../../../../utils/CommonUtils';


class UserRatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRating: [],
            selectedRating: ''
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('rating')
        let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "rating");

        let tempSelectedRating = dataSelect.filter(
            item => item.keyMap === this.props.rating)
        let index = dataSelect.indexOf(tempSelectedRating[0])

        let tempList = CommonUtils.getRatingList(dataSelect, index)
        tempList[index].isSelected = true
        this.setState({
            listRating: tempList
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rating !== this.props.rating) {
            await this.props.fetchAllCodesByType('rating')
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "rating");

            let tempSelectedRating = dataSelect.filter(
                item => item.keyMap === this.props.rating)
            let index = dataSelect.indexOf(tempSelectedRating[0])

            let tempList = CommonUtils.getRatingList(dataSelect, index)
            tempList[index].isSelected = true
            this.setState({
                listRating: tempList
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
        let { listRating } = this.state

        return (
            <React.Fragment>

                <div className='stars-icon'>
                    {listRating && listRating.length > 0 &&
                        listRating.map((item, index) => {
                            return (
                                <img key={item.id}
                                    src={item.isSelected === true ? starIconYellow : starIconGray}
                                    alt='star' />
                            )
                        })}
                </div>
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRatingComponent));
