import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SignUpNewletter.scss';
import { languages } from '../../../utils'
// import * as actions from "../store/actions";

class SignUpNewletter extends Component {
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
        let language = this.props.lang;
        return (
            <div className='sign-up-newletter-container'>
                <div className='sign-up-newletter-content row'>
                    <div className='sign-up-newletter-title col-md-12 col-lg-6 col-xl-4'>
                        <i className="fa fa-envelope"></i>
                        <span><FormattedMessage id="customer.homepage.newletter.title" /></span>
                    </div>
                    <div className='sign-up-newletter-input col-md-6 col-lg-6 col-xl-8'>
                        <input className='form-control' placeholder={
                            language === languages.VI ?
                                "Nhập địa chỉ email của bạn" :
                                "Type your email"
                        } />
                        <button><FormattedMessage id="customer.homepage.newletter.subcribe" /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpNewletter);
