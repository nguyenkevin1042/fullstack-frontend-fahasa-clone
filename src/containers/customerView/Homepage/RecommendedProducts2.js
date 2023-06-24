import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { languages } from '../../../utils';

import './RecommendedProducts2.scss';
import * as actions from "../../../store/actions";

class RecommendedProducts2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTag: '',
            listTags: [],
            listProducts: [],
        };
    }

    async componentDidMount() {
        let { tagName } = this.props

        await this.props.getTagByType(tagName)

        let dataTag = this.buildDataInputSelect(this.props.allTagArr);
        this.setState({
            listTags: dataTag,
            selectedTag: dataTag[0]
        })

        // await this.props.getProductByTagId(dataTag[0].id)
        // this.setState({
        //     listProducts: this.props.allProductArr
        // })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.valueVI;
                let labelEN = item.valueEN;

                obj.id = item.id;
                obj.keyName = item.keyName;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });
        }

        return result;
    }


    renderProductHeader = () => {
        let { selectedTag, listTags } = this.state

        return (
            <>
                <div className='header-item-list'>
                    {listTags && listTags.length > 0 &&
                        listTags.map((item, index) => (
                            <div className={selectedTag === item ? 'header-item-tag active' : 'header-item-tag'}
                                onClick={() => this.handleOnClickTag(item)}>
                                {item.label}
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    handleOnClickTag = async (item) => {
        this.setState({
            selectedTag: item,
        })
    }

    handleViewMoreProductWithTag = (keyName) => {
        if (this.props.history) {
            this.props.history.push("/" + keyName);
        }
    }

    render() {
        let { tagName, allTagArr } = this.props
        console.log(allTagArr)
        return (
            <div className='recommended-product-container'>
                <div className='recommended-product-header'>
                    <div className='recommended-product-title'>
                        {tagName}
                    </div>
                    <div>{this.renderProductHeader()}</div>
                </div>

                {/* <div>
                {this.renderProductList()}
            </div> */}

                {/* <div className='more-product-btn col-12'>
                <button onClick={() => this.handleViewMoreProductWithTag(selectedTag.keyName)}>
                    Xem Thêm</button>
            </div> */}
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isFetchingData: state.admin.isFetchingData,
        allTagArr: state.admin.allTagArr,
        allProductArr: state.admin.allProductArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTagByType: (type) => dispatch(actions.getTagByType(type)),
        getProductByTagId: (tagId) => dispatch(actions.getProductByTagId(tagId)),
        fetchProductById: (inputId) => dispatch(actions.fetchProductById(inputId))

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendedProducts2));
