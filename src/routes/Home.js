import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {

        const { isAdminLoggedIn, isUserLoggedIn } = this.props;
        let linkToRedirect = isAdminLoggedIn ? '/system/user-manage' : '/home';
        // let linkToRedirect = isUserLoggedIn ? '/home' : '/login';

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isAdminLoggedIn: state.admin.isLoggedIn,
        isUserLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
