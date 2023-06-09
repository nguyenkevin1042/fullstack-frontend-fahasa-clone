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
import RecommendedProducts from './RecommendedProducts';
import LoadingOverlay from 'react-loading-overlay'

import _ from 'lodash';
import NotificationModal from './modal/NotificationModal';
import BrandSection from './BrandSection';
import RecommendedProducts2 from './RecommendedProducts2';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagArr: ['notebook', 'textbook', 'pencils'],
            isLoading: false,
            isModalOpened: true,
            listAllTag: []
        };
    }

    async componentDidMount() {
        document.title = "Homepage | Nguyenkevin1042's Fahasa Clone"
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

        if (prevProps.allTagArr !== this.props.allTagArr) {
            this.setState({
                listAllTag: this.props.allTagArr,
            })
        }
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpened: false
        })
    }


    render() {
        return (
            <React.Fragment>
                <Header />
                <Banner />
                <QuickAccess />

                <ProductCategory />

                <RecommendedProducts tagName={'notebook'} />
                <RecommendedProducts tagName={'textbook'} />
                <RecommendedProducts tagName={'pencils'} />

                {/* <RecommendedProducts2 tagName={'notebook'} /> */}

                {/* <RecommendedProducts2 tagName={'psychology-life-skills'} /> */}
                {/* {tagArr.map((item, index) => (
                    <RecommendedProducts tagName={item} />
                ))} */}

                <BrandSection />
                <SignUpNewletter />
                <Footer />

                {/* <NotificationModal isModalOpened={isModalOpened}
                    closeModal={this.handleCloseModal} /> */}
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allTagArr: state.admin.allTagArr,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllTag: () => dispatch(actions.getAllTag()),
        getTagByType: (inputType) => dispatch(actions.getTagByType(inputType)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
