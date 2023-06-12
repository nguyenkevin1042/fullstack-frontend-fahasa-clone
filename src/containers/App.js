import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import {
    userIsAuthenticated, userIsNotAuthenticated,
    adminIsAuthenticated, adminIsNotAuthenticated
} from '../hoc/authentication';

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
import ProductDetail from './customerView/ProductDetail/ProductDetail';
import CustomerAccount from './customerView/CustomerAccount/CustomerAccount';
import ProductList from './customerView/ProductList/ProductList';
import Cart from './customerView/Cart/Cart';

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
                        <CustomScrollbars style={{ height: '100vh' }}>
                            <span className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={adminIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={adminIsAuthenticated(System)} />

                                    <Route path={path.HOMEPAGE} exact component={(Homepage)} />
                                    <Route path={path.CUSTOMER_LOGIN} exact component={(CustomerLogin)} />
                                    <Route path={path.CUSTOMER_ACCOUNT} exact component={(CustomerAccount)} />
                                    <Route path={path.PRODUCT_DETAIL} exact component={(ProductDetail)} />
                                    <Route path={path.PRODUCT_LIST} exact component={(ProductList)} />
                                    <Route path={path.CART} exact component={(Cart)} />
                                    {/* <Route path={path.SEARCH_RESULT} exact component={(SeacrchResult)} /> */}
                                </Switch>

                            </span>
                        </CustomScrollbars>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />

                    </div>
                </Router>

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);