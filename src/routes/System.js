import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/adminView/System/UserManage';
import ManageAllCodes from '../containers/adminView/System/ManageAllCodes/ManageAllCodes';
import ManageCategory from '../containers/adminView/System/ManageCategory/ManageCategory';

import Header from '../containers/adminView/Header/Header';
import ManageProduct from '../containers/adminView/System/ManageProduct/ManageProduct';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/manage-all-codes" component={ManageAllCodes} />
                            <Route path="/system/manage-category" component={ManageCategory} />
                            <Route path="/system/manage-product" component={ManageProduct} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
