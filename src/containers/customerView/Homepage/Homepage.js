import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Homepage.scss';
import * as actions from "../../../store/actions";
import Header from '../components/Header';
import Banner from '../Homepage/Banner';
import QuickAccess from './QuickAccess';
import CustomScrollbars from '../../../components/CustomScrollbars';
import Footer from '../components/Footer';
import SignUpNewletter from './SignUpNewletter';
import ProductCategory from './ProductCategory';
import FlashSale from './FlashSale';
import Products from './Products';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stationaryArr: ['Dụng Cụ Học Sinh - VPP Giá Sốc',
                'Bộ Dụng Cụ Học Tập', 'Combo Tiết Kiệm', 'Cặp - Balo'],
            itemArr: ['Đồ Điện Gia Dụng', 'Đồ Dùng Cá Nhân',
                'Nhà Cửa Đời Sống', 'Thiết Bị Số - Phụ Kiện Số']
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }


    render() {
        let { stationaryArr, itemArr } = this.state;
        return (
            <React.Fragment>
                <Header />
                <Banner />
                <QuickAccess />
                <FlashSale />
                {/* <Trending /> */}
                <ProductCategory />

                <Products headerArr={stationaryArr} />
                <Products headerArr={itemArr} />

                <SignUpNewletter />
                <Footer />
            </React.Fragment >

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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
