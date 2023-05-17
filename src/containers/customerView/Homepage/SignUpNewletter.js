import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SignUpNewletter.scss';
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
        return (
            <div className='sign-up-newletter-container'>
                <div className='sign-up-newletter-content row'>
                    <div className='col-md-4 sign-up-newletter-title'>
                        <i className="fa fa-envelope"></i>
                        <span>Sign up for newletter</span>
                    </div>
                    <div className='col-md-8 sign-up-newletter-input'>
                        <input className='form-control' placeholder='Nhập địa chỉ email của bạn' />
                        <button>Subcribe</button>
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
