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
import LoadingOverlay from 'react-loading-overlay'

import _ from 'lodash';
import NotificationModal from './modal/NotificationModal';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagArr: ['notebook', 'textbook'],
            isLoading: false,
            isModalOpened: true
        };
    }

    async componentDidMount() {
        document.title = "HomePage | Nguyenkevin1042's Fahasa Clone"
        await this.props.getAllTag()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpened: false
        })
    }


    render() {
        let { tagArr, isLoading, isModalOpened } = this.state;
        let { allTagArr } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Banner />
                <QuickAccess />

                <ProductCategory />

                {/* <LoadingOverlay
                    active={isLoading}
                    spinner={true}
                    text='Please wait...'>
                    {allTagArr.map((item, index) => (

                        <Products tagData={item} />

                    ))}
                </LoadingOverlay> */}


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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
