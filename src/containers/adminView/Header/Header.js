import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../../store/actions";
import Navigator from '../../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    render() {
        const { adminProcessLogout, adminInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='welcome-text'>
                    {adminInfo.lastName} {adminInfo.firstName}
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={adminProcessLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        adminProcessLogout: () => dispatch(actions.adminProcessLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
