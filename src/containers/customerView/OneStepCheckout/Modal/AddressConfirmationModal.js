import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './AddressConfirmationModal.scss';
// import * as actions from "../../../store/actions";
import { Modal } from 'reactstrap'

class AddressConfirmationModal extends Component {
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



    handleSaveNewAddress = async () => {
        await this.props.createNewAddress({ ...this.state })
    }

    render() {
        let { isOpenConfirmAddress, closeConfirmAddress, completedOrder } = this.props

        return (
            <Modal isOpen={isOpenConfirmAddress}
                toggle={closeConfirmAddress}
                size='md'
                centered>
                <div className='sharing-modal-container address-confirmation-container'>
                    <div className='sharing-modal-header address-confirmation-title'>
                        <FormattedMessage id="customer.one-time-checkout.address-confirmation" />
                    </div>
                    <div className='address-text'>

                    </div>
                    <div className='actions'>

                    </div>
                </div>

            </Modal>


        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        actionResponse: state.user.actionResponse,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // createNewAddress: (inputData) => dispatch(actions.createNewAddress(inputData))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressConfirmationModal));
