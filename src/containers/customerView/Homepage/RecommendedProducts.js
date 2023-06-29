import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './RecommendedProducts.scss';
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { languages } from '../../../utils';
import NumericFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedProductItem from './RecommendedProductItem';

class RecommendedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTag: '',
            listTags: [],
            listProducts: [],
            isLoading: false,
        };
    }

    async componentDidMount() {
        let { tagName } = this.props

        await this.props.getTagByType(tagName)

        let dataTag = this.buildDataInputSelect(this.props.allTagArr);
        this.setState({
            listTags: dataTag,
            selectedTag: dataTag ? dataTag[0] : ''
        })

        // if (dataTag && dataTag.length > 0) {
        //     await this.props.getProductByTagId(dataTag[0].id)
        //     this.setState({
        //         listProducts: this.props.allProductArr
        //     })
        // }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            let { tagName } = this.props

            await this.props.getTagByType(tagName)

            let dataTag = this.buildDataInputSelect(this.props.allTagArr);
            this.setState({
                listTags: dataTag,
                selectedTag: dataTag[0]
            })

            await this.props.getProductByTagId(this.state.selectedTag.id)
            this.setState({
                listProducts: this.props.allProductArr
            })
        }

        if (prevProps.tagName !== this.props.tagName) {
            await this.props.getTagByType(this.props.tagName)
            let dataTag = this.buildDataInputSelect(this.props.tagData);
            this.setState({
                listTags: dataTag,
                selectedTag: dataTag[0]
            })
        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (this.state.selectedTag && prevState.selectedTag !== this.state.selectedTag) {
            await this.props.getProductByTagId(this.state.selectedTag.id)
            this.setState({
                listProducts: this.props.allProductArr
            })
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

    handleRedirectToProductDetail = (productKeyName) => {
        if (this.props.history) {
            this.props.history.push("/product/" + productKeyName);
        }
    }

    renderProductHeader = () => {
        let { selectedTag, listTags } = this.state

        return (
            <>
                <div className='header-item-list'>
                    {listTags && listTags.length > 0 &&
                        listTags.map((item, index) => (
                            <div key={item.id}
                                className={selectedTag === item ? 'header-item-tag active' : 'header-item-tag'}
                                onClick={() => this.handleOnClickTag(item)}>
                                {item.label}
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    renderProductList = () => {
        let { listProducts } = this.state
        let settings = {
            className: "products-list",
            dots: false,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            }]
        };

        return (
            <>
                <Slider {...settings} >
                    {listProducts && listProducts.length > 0 &&
                        listProducts.map((item, index) => {

                            return (
                                <RecommendedProductItem productId={item.productId} key={item.productId} />

                            )
                        })}
                </Slider >
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
        let { selectedTag } = this.state

        return (
            <div className='products-container'>
                <div className='products-header'>
                    {this.renderProductHeader()}
                </div>

                <div>
                    {this.renderProductList()}
                </div>

                <div className='more-product-btn col-12'>
                    <button onClick={() => this.handleViewMoreProductWithTag(selectedTag.keyName)}>
                        <FormattedMessage id="customer.homepage.recommended-products.see-more" />
                    </button>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendedProducts));
