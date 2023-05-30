import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './DropdownAccount.scss';
import * as actions from "../../../../store/actions";
import AccountModal from './AccountModal';

class DropdownAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpened: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

    }

    handleOpenAccountModal = () => {
        this.setState({
            isModalOpened: true
        })
    }
    handleCloseAccountModal = () => {
        this.setState({
            isModalOpened: false
        })
    }
    handleSignOut = () => {
        this.props.userProcessLogout();
        if (this.props.history) {
            this.props.history.push("/home");
        }
    }

    renderIfNotSignIn = () => {
        return (
            <>
                <div className='col-12 sign-in-btn'>
                    <button onClick={() => this.handleOpenAccountModal()}>
                        <FormattedMessage id="customer.login.sign-in-text" /></button>
                </div>
                <div className='col-12 sign-up-btn'>
                    <button><FormattedMessage id="customer.login.sign-up-text" /></button>
                </div>
            </>
        )
    }

    renderIfSignedIn = () => {
        let { userInfo, userProcessLogout } = this.props
        return (
            <>
                <div className='col-12 signed-in-action' onClick={() => this.handleSignOut()}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span><FormattedMessage id="customer.homepage.header.account.signout" /></span>
                </div>
            </>
        )
    }


    render() {
        let { isModalOpened } = this.state
        let { userInfo } = this.props

        return (
            <>
                <div className='dropdown-account-container container'>
                    {userInfo ? this.renderIfSignedIn() : this.renderIfNotSignIn()}
                </div>
                <AccountModal isModalOpened={isModalOpened}
                    closeAccountModal={this.handleCloseAccountModal} />
            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userProcessLogout: () => dispatch(actions.userProcessLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropdownAccount));
