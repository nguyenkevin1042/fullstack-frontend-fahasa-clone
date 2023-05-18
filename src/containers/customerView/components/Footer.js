import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Footer.scss';
import * as actions from "../../../store/actions";

class Footer extends Component {
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
            <div className='footer-container'>
                <div className='footer-content'>
                    <div className='footer-information row'>
                        <div className='left col-12  col-lg-4'>
                            <div className='logo img-fluid'>

                            </div>

                            <div className='address'>
                                <p>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM<br />
                                    Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA<br />
                                    60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>
                            </div>

                            <div className='more-details'>
                                Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
                            </div>

                            <div className='social-list'>
                                <div className='facebook icon'>
                                </div>
                                <div className='instagram icon'>
                                </div>
                                <div className='youtube icon'>
                                </div>
                                <div className='tumblr icon'>
                                </div>
                                <div className='twitter icon'>
                                </div>
                                <div className='pinterest icon'>
                                </div>
                            </div>

                            <div className='download'>
                                <div className='android'>

                                </div>
                                <div className='ios'>

                                </div>
                            </div>
                        </div>

                        <div className='right col-12 col-lg-8'>
                            <div className='row'>
                                <div className='footer-option col-12 col-sm-6  col-lg-4'>
                                    <div className='footer-titles'>
                                        Dịch vụ
                                    </div>
                                    <div className='footer-option-items'>
                                        <p className='child-item'>Điều khoản sử dụng</p>
                                        <p className='child-item'>Chính sách bảo mật thông tin cá nhân</p>
                                        <p className='child-item'>Chính sách bảo mật thanh toán</p>
                                        <p className='child-item'>Giới thiệu Fahasa</p>
                                        <p className='child-item'>Hệ thống trung tâm - nhà sách</p>
                                    </div>
                                </div>
                                <div className='footer-option col-12 col-sm-6 col-lg-4'>
                                    <div className='footer-titles'>
                                        Hỗ trợ
                                    </div>
                                    <div className='footer-option-items'>
                                        <p className='child-item'>Chính sách đổi - trả - hoàn tiền</p>
                                        <p className='child-item'>Chính sách bảo hành - bồi hoàn</p>
                                        <p className='child-item'>Chính sách vận chuyển</p>
                                        <p className='child-item'>Chính sách khách sỉ</p>
                                        <p className='child-item'>Phương thức thanh toán và xuất HĐ</p>
                                    </div>
                                </div>
                                <div className='footer-option col-12 col-sm-6 col-lg-4'>
                                    <div className='footer-titles'>
                                        Tài khoản của tôi
                                    </div>
                                    <div className='footer-option-items'>
                                        <p className='child-item'>Đăng nhập/Tạo mới tài khoản</p>
                                        <p className='child-item'>Thay đổi địa chỉ khách hàng</p>
                                        <p className='child-item'>Chi tiết tài khoản</p>
                                        <p className='child-item'>Lịch sử mua hàng</p>
                                    </div>
                                </div>
                            </div>


                            {/* <div className='container'> */}
                            <div className='contact-infor'>
                                <div className='contact-infor-title'>Liên hệ</div>
                                <div className='contact-infor-content row'>
                                    <div className='contact-infor-item col-12 col-lg-4'>
                                        <i className="fa fa-map-marker"></i>
                                        <span>Dĩ An, Bình Dương</span>
                                    </div>
                                    <div className='contact-infor-item col-12 col-lg-4'>
                                        <i className="fa fa-envelope"></i>
                                        <span>nguyenkevin@gmail.com</span>
                                    </div>
                                    <div className='contact-infor-item col-12 col-lg-4'>
                                        <i className="fa fa-phone"></i>
                                        <span>0981754134</span>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}

                            <div className='payments-method d-none d-md-block d-lg-block'>
                                <div className='payments-up'>
                                    <div className='payment-icon'>
                                        <div className='payment-1'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-2'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-3'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-4'></div>
                                    </div>

                                </div>
                                <div className='payments-down'>
                                    <div className='payment-icon'>
                                        <div className='payment-5'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-6'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-7'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-8'></div>
                                    </div>
                                    <div className='payment-icon'>
                                        <div className='payment-9'></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='footer-copyright row'>
                        <p className='col-12'>Click <a href='https://github.com/nguyenkevin1042/fullstack-frontend-fahasa-clone'>here</a> to redirect to frontend source code</p>
                        <p className='col-12'>Click <a href='https://github.com/nguyenkevin1042/fullstack-backend-fahasa-clone'>here</a> to redirect to backend source code</p>
                    </div>
                </div >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
