import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'
import './App.scss';

import Home from '../routes/Home';
import Login from '../containers/adminView/Login/Login';
import Header from '../containers/adminView/Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import Homepage from './customerView/Homepage/Homepage';
import CustomerLogin from './customerView/Login/Login';
import CustomScrollbars from '../components/CustomScrollbars';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>

                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        <CustomScrollbars style={{ height: '768px' }}>
                            <span className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />

                                    <Route path={path.HOMEPAGE} exact component={(Homepage)} />
                                    <Route path={path.CuSTOMER_LOGIN} exact component={(CustomerLogin)} />
                                </Switch>

                            </span>
                        </CustomScrollbars>

                    </div>
                </Router>

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);