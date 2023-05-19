import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductCategory.scss';
// import * as actions from "../store/actions";

class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }


    render() {
        return (
            <div className='product-category-container'>
                <div className='product-category-content'>
                    <div className='content-title row'>
                        <div className='content-title-icon'></div>
                        <div className='content-title-text'>
                            <FormattedMessage id="customer.homepage.product-category.title" />
                        </div>
                    </div>
                    <div className='context-items row'>
                        <div className='child-item col-1'>
                            <div className='item-image item1'></div>
                            <div className='item-text text-center'>VPP<br />DCHS</div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item2'></div>
                            <div className='item-text text-center'><FormattedMessage id="customer.homepage.product-category.toys" /></div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item3'></div>
                            <div className='item-text text-center'>
                                <FormattedMessage id="customer.homepage.product-category.romantic-fiction" />
                                <br />
                                <FormattedMessage id="customer.homepage.product-category.danmei" />
                            </div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item4'></div>
                            <div className='item-text text-center'><FormattedMessage id="customer.homepage.product-category.foreign-language-book" /></div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item5'></div>
                            <div className='item-text text-center'>Manga</div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item6'></div>
                            <div className='item-text text-center'>Tâm Linh<br />Luân Hồi</div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item7'></div>
                            <div className='item-text text-center'>Tâm Lý<br />Thao Túng</div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item8'></div>
                            <div className='item-text text-center'>Đối Mặt<br />Thức Tỉnh</div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item9'></div>
                            <div className='item-text text-center'><FormattedMessage id="customer.homepage.product-category.novel" /></div>
                        </div>
                        <div className='child-item col-1'>
                            <div className='item-image item10'></div>
                            <div className='item-text text-center'><FormattedMessage id="customer.homepage.product-category.light-novel" /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);
