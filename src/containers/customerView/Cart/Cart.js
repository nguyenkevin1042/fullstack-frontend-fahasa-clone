import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './Cart.scss';
// import * as actions from "../store/actions";

import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }


    render() {
        return (
            <React.Fragment>
                <Header />

                <div className='cart-container'>
                    <div className='row'>
                        <div className='cart-left-content col-xl-8'>
                            <table>
                                <div className='left-content-up'>
                                    <tr className='row'>
                                        <th className='col-xl-1'>
                                            <input type="checkbox" id="choose-all" name="choose-all" checked />
                                        </th>
                                        <th className='col-xl-6'>
                                            <label for="choose-all">
                                                <FormattedMessage id="customer.cart.choose-all" />
                                            </label>
                                        </th>
                                        <th className='col-xl-2'>
                                            <label>
                                                Số lượng
                                            </label>
                                        </th>
                                        <th className='col-xl-2'>
                                            <label>
                                                Thành tiền
                                            </label>
                                        </th>
                                        <th className='col-xl-1'></th>
                                    </tr>
                                </div>

                                <div className='left-content-down'>
                                    <tr className='row'>
                                        <td className='col-xl-1'>
                                            <input type="checkbox" id="choose-all" name="choose-all" checked />
                                        </td>
                                        <td className='col-xl-6'>
                                            <label for="choose-all">
                                                <FormattedMessage id="customer.cart.choose-all" />
                                            </label>
                                        </td>
                                        <td className='col-xl-2'>
                                            <label>
                                                Số lượng
                                            </label>
                                        </td>
                                        <td className='col-xl-2'>
                                            <label>
                                                Thành tiền
                                            </label>
                                        </td>
                                        <td className='col-xl-1'>
                                            <i className="fas fa-trash"></i>
                                        </td>
                                    </tr>
                                </div>

                            </table>


                            {/* <div className='left-content-up'>
                                <div className='row'>
                                    <div className='choose-all-section col-xl-8'>
                                        <input type="checkbox" id="choose-all" name="choose-all" checked />
                                        <label for="choose-all">
                                            <FormattedMessage id="customer.cart.choose-all" />

                                        </label>
                                    </div>
                                    <div className='col-xl-2'>
                                        <label>
                                            Số lượng
                                        </label>
                                    </div>
                                    <div className='col-xl-2'>
                                        <label>
                                            Thành tiền
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='left-content-down'>

                            </div> */}
                        </div>

                        <div className='cart-right-content col-xl-4'>

                        </div>
                    </div>
                </div >

                <SignUpNewletter />
                <Footer />

            </React.Fragment >

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
