import React, { Component } from 'react';
import { connect } from "react-redux";
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


    render() {
        let { isModalOpened } = this.state
        console.log(isModalOpened)
        return (
            <>
                <div className='dropdown-account-container container'>
                    <div className='col-12 sign-in-btn'>
                        <button onClick={() => this.handleOpenAccountModal()}><FormattedMessage id="customer.login.sign-in-text" /></button>
                    </div>
                    <div className='col-12 sign-up-btn'>
                        <button><FormattedMessage id="customer.login.sign-up-text" /></button>
                    </div>
                </div>
                <AccountModal isModalOpened={isModalOpened}
                    closeAccountModal={this.handleCloseAccountModal} />
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownAccount);
