import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './MyOrderDetailComponent.scss';
import * as actions from "../store/actions";

class MyOrderDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log('MyOrderDetailComponent')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }


    render() {
        console.log('MyOrderDetailComponent')
        return (
            <React.Fragment>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderDetailComponent));
