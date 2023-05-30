import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CustomerAccount.scss';
// import * as actions from "../store/actions";
import Header from '../components/Header';
import Footer from '../components/Footer';

class CustomerAccount extends Component {
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

    handleChooseMenu = (event, id) => {
        console.log(event, id)
        console.log(event.target.id)
    }

    renderRightContent = () => {
        return (
            <>
                <div className='right-content-header'>Bảng điều khiển tài khoản</div>
            </>
        )
    }


    render() {
        return (
            <React.Fragment>
                <Header />
                <div className='account-container'>
                    <div className='row'>
                        <div className='account-left-container col-xl-3'>
                            <div className='left-content'>
                                <div className='left-content-header'>Tài khoản</div>
                                <div className='left-content-options'>
                                    <ul>
                                        <li className='active' id='dashboard' accessKey={1}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Bảng điều khiển tài khoản
                                        </li>
                                        <li id='account-information' accessKey={2}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Thông tin tài khoản
                                        </li>
                                        <li id='address' accessKey={3}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Sổ địa chỉ
                                        </li>
                                        <li id='my-order' accessKey={4}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Đơn hàng của tôi
                                        </li>
                                        <li id='voucher' accessKey={5}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Ví voucher
                                        </li>
                                        <li id='f-point' accessKey={6}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Tài khoản F-point/Freeship
                                        </li>
                                        <li id='my-reviews' accessKey={7}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Nhận xét của tôi

                                        </li>
                                        <li id='notification' accessKey={8}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Thông báo

                                        </li>
                                        <li id='sign-up-newletter' accessKey={9}
                                            onClick={(event) => this.handleChooseMenu(event)}>
                                            Đăng ký nhận tin điện tử

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='account-right-container col-xl-9'>
                            <div className='right-content'>
                                {this.renderRightContent()}
                            </div>
                        </div>
                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccount);
