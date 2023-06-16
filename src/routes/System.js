import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/adminView/System/UserManage';
import ManageAllCodes from '../containers/adminView/System/ManageAllCodes/ManageAllCodes';
import ManageCategory from '../containers/adminView/System/ManageCategory/ManageCategory';
import ManageSubCategory from '../containers/adminView/System/ManageCategory/ManageSubCategory';
import ManageChildCategory from '../containers/adminView/System/ManageCategory/ManageChildCategory';

import Header from '../containers/adminView/Header/Header';
import ManageProduct from '../containers/adminView/System/ManageProduct/ManageProduct';
import ManageOrders from '../containers/adminView/System/ManageOrders/ManageOrders';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <Fragment>
                {this.props.isAdminLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/manage-all-codes" component={ManageAllCodes} />
                            <Route path="/system/manage-category" component={ManageCategory} />
                            <Route path="/system/manage-sub-category" component={ManageSubCategory} />
                            <Route path="/system/manage-child-category" component={ManageChildCategory} />
                            <Route path="/system/manage-product" component={ManageProduct} />
                            <Route path="/system/product/set-discount" component={UserManage} />
                            <Route path="/system/manage-orders" component={ManageOrders} />

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
        isAdminLoggedIn: state.admin.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
