import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/adminView/System/UserManage';
import ManageAllCodes from '../containers/adminView/System/ManageAllCodes/ManageAllCodes';
import ManageCategory from '../containers/adminView/System/ManageCategory/ManageCategory';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>

                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/manage-all-codes" component={ManageAllCodes} />
                        <Route path="/system/manage-category" component={ManageCategory} />

                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
