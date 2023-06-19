import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './NotificationModal.scss';
import { Modal } from 'reactstrap'

// import * as actions from "../store/actions";

class NotificationModal extends Component {
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
        let { isModalOpened, closeModal, message, productImg, payCheckNow } = this.props
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpened}
                    className={'cart-modal-container'}
                    size='modal-sm'
                    centered>

                    {/* <div className='cart-modal-content'>
                        <div className='message'>
                            {message}
                        </div>

                        <div className='product-img'
                            style={{
                                backgroundImage: "url(" + productImg + ")"
                            }}>
                        </div>
                    </div> */}

                    <div className='cart-modal-button'>
                        <button className='add-more-btn'
                            onClick={closeModal}>
                            Chọn thêm
                        </button>
                        <button className='pay-check-btn'
                            onClick={payCheckNow}>
                            Thanh toán
                        </button>
                    </div>

                </Modal>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationModal));
