import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './MyReviewsComponent.scss';
import * as actions from "../../../../store/actions";
import { CommonUtils, languages } from '../../../../utils';

class MyReviewsComponent extends Component {
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
                <div className='right-content-header'>
                    <FormattedMessage id='customer.account.my-reviews.title' />
                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyReviewsComponent));
