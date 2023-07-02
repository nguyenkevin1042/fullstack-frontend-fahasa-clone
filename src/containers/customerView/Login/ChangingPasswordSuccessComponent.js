import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './ChangingPasswordSuccessComponent.scss';

import * as actions from "../../../store/actions";

import { languages } from '../../../utils';

class ChangingPasswordSuccessComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { isOpenChangingPasswordSuccess, backSignInForm } = this.props;

        return (
            <>
                {isOpenChangingPasswordSuccess === true &&
                    <div className='changing-password-success-container'>
                        <div className='changing-password-success-content'>
                            <div className='log-in-header-forgot-password changing-password-success-title'>
                                <FormattedMessage id="customer.login.recovery-password-success" />
                            </div>
                            <div className='changing-password-success-icon'></div>
                            <div className='sign-in-button'>
                                <button onClick={backSignInForm}>
                                    <FormattedMessage id="customer.login.sign-in-text" />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangingPasswordSuccessComponent));
