import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Homepage.scss';
import * as actions from "../../../store/actions";
import Header from '../components/Header';
import Banner from '../Homepage/Banner';
import QuickAccess from './QuickAccess';
import CustomScrollbars from '../../../components/CustomScrollbars';

class Homepage extends Component {
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
            <React.Fragment>
                <Header />
                <Banner />
                <QuickAccess />
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
