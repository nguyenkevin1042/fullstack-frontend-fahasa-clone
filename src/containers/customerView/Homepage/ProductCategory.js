import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductCategory.scss';
import { Link } from "react-router-dom";

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
                            <Link to='/category/vpp-dung-cu-hoc-sinh'
                                className='sharing-link-content'
                            >
                                <div className='item-image item1'></div>
                                <div className='item-text text-center'>VPP<br />DCHS</div>
                            </Link>
                        </div>

                        <div className='child-item col-1'>
                            <Link to='/category/do-choi'
                                className='sharing-link-content'>
                                <div className='item-image item2'></div>
                                <div className='item-text text-center'>
                                    <FormattedMessage id="customer.homepage.product-category.toys" /></div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link to='/category/vpp-dung-cu-hoc-sinh' className='sharing-link-content'>
                                <div className='item-image item3'></div>
                                <div className='item-text text-center'>
                                    <FormattedMessage id="customer.homepage.product-category.romantic-fiction" />
                                    <br />
                                    <FormattedMessage id="customer.homepage.product-category.danmei" />
                                </div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link className='sharing-link-content'>
                                <div className='item-image item4'></div>
                                <div className='item-text text-center'><FormattedMessage id="customer.homepage.product-category.foreign-language-book" /></div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link className='sharing-link-content'>
                                <div className='item-image item5'></div>
                                <div className='item-text text-center'>Manga</div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link className='sharing-link-content'>
                                <div className='item-image item6'></div>
                                <div className='item-text text-center'>Tâm Linh<br />Luân Hồi</div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link className='sharing-link-content'>
                                <div className='item-image item7'></div>
                                <div className='item-text text-center'>Tâm Lý<br />Thao Túng</div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link to='/sach-trong-nuoc/tam-ly-ky-nang-song/ky-nang-song'
                                className='sharing-link-content'>
                                <div className='item-image item8'></div>
                                <div className='item-text text-center'>Đối Mặt<br />Thức Tỉnh</div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link to='/sach-trong-nuoc/van-hoc/tieu-thuyet'
                                className='sharing-link-content'>
                                <div className='item-image item9'></div>
                                <div className='item-text text-center'>
                                    <FormattedMessage id="customer.homepage.product-category.novel" /></div>
                            </Link>
                        </div>
                        <div className='child-item col-1'>
                            <Link to='/sach-trong-nuoc/van-hoc/light-novel'
                                className='sharing-link-content'>
                                <div className='item-image item10'></div>
                                <div className='item-text text-center'><FormattedMessage id="customer.homepage.product-category.light-novel" /></div>
                            </Link>
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
