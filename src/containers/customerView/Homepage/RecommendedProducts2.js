import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './RecommendedProducts2.scss';
// import * as actions from "../store/actions";

class RecommendedProducts2 extends Component {
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
            <div className='recommended-product-container'>
                <div className='recommended-product-header'>
                    {/* {this.renderProductHeader()} */}
                </div>

                {/* <div>
                {this.renderProductList()}
            </div> */}

                {/* <div className='more-product-btn col-12'>
                <button onClick={() => this.handleViewMoreProductWithTag(selectedTag.keyName)}>
                    Xem Thêm</button>
            </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendedProducts2));
