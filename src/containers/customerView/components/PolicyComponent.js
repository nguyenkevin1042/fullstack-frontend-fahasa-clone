import React, { Component } from 'react';
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';
import './PolicyComponent.scss';
// import * as actions from "../store/actions";

class PolicyComponent extends Component {
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
            <div className='policy-container'>
                <div className='policy-content'>
                    <div className='row'>
                        <div className='policy-item col-4'>
                            <i className='fa fa-store'></i>
                            <span>Chính Sách Khách Sỉ</span>
                        </div>
                        <div className='policy-item col-4'>
                            <i className='fa fa-truck'></i>
                            <span>Thời Gian Giao Hàng</span>
                        </div>
                        <div className='policy-item col-4'>
                            <i className='fas fa-exchange-alt'></i>
                            <span>Chính Sách Đổi Trả</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(PolicyComponent);
