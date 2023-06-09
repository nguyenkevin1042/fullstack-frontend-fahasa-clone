import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './OtherProductsComponent.scss';
import * as actions from "../../../store/actions";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from '../components/ProductItem';

class OtherProductsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            subCategory: '',
            listProductBySubCategory: []
        };
    }

    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (this.props.category && this.props.subCategory && prevProps.category !== this.props.category &&
            prevProps.subCategory !== this.props.subCategory) {

            await this.props.fetchAllProductBySubCategory(this.props.category, this.props.subCategory)
        }

        if (prevProps.allProductArr !== this.props.allProductArr ||
            prevProps.lang !== this.props.lang) {
            this.setState({
                listProductBySubCategory: this.props.allProductArr,
            })
        }
    }

    renderTitle = () => {
        let { titleKey } = this.props

        return (
            <>
                {titleKey === 'suggest' && <FormattedMessage id="customer.product-detail.suggest" />}
                {titleKey === 'relevant-products' && <FormattedMessage id="customer.product-detail.relevant-products" />}
            </>
        )
    }

    renderProducts = () => {
        let { titleKey } = this.props
        let { listProductBySubCategory } = this.state
        let settings = {
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
                {titleKey === 'suggest' && (
                    <Slider {...settings} >
                        {listProductBySubCategory && listProductBySubCategory.length > 0 &&
                            listProductBySubCategory.map((item, index) => (
                                <div key={item.id}>
                                    {/* <ProductItem productId={item.id} /> */}
                                </div>
                            ))
                        }
                    </Slider>
                )}
                {titleKey === 'relevant-products' && <FormattedMessage id="customer.product-detail.same-author" />}
            </>
        )
    }

    render() {

        return (
            <div className='other-products-container'>
                <div className='other-products-content'>
                    <div className='other-products-title'>
                        {this.renderTitle()}
                    </div>

                    <div>
                        {this.renderProducts()}
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProductBySubCategory: (inputCategory, inputSubCategory) => dispatch(actions.fetchAllProductBySubCategory(inputCategory, inputSubCategory)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OtherProductsComponent));
