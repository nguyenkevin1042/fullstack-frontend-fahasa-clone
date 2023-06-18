import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Homepage.scss';
import * as actions from "../../../store/actions";
import Header from '../components/Header';
import Banner from '../Homepage/Banner';
import QuickAccess from './QuickAccess';
import Footer from '../components/Footer';
import SignUpNewletter from './SignUpNewletter';
import ProductCategory from './ProductCategory';
import FlashSale from './FlashSale';
import Products from './Products';
import _ from 'lodash';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagArr: ['notebook', 'textbook'],

        };
    }

    async componentDidMount() {
        await this.props.getAllTag()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
    }


    render() {
        let { tagArr } = this.state;
        let { allTagArr } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Banner />
                <QuickAccess />
                {/* <FlashSale /> */}
                {/* <Trending /> */}

                <ProductCategory />

                {allTagArr.map((item, index) => (
                    <Products tagData={item} />
                ))}

                {/* {tagArr.map((item, index) => (
                    <Products tagType={item} index={index} />
                ))} */}


                {/* <Products tagType={'notebook'} />
                <Products tagType={'textbook'} /> */}

                {/* <Products headerArr={stationaryArr} />
                <Products headerArr={itemArr} /> */}

                <SignUpNewletter />
                <Footer />
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allTagArr: state.admin.allTagArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllTag: () => dispatch(actions.getAllTag()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
