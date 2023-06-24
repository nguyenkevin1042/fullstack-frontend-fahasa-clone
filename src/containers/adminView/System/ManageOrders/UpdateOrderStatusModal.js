import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './UpdateOrderStatusModal.scss';
import Select from 'react-select';


import { Modal } from 'reactstrap'
import { CommonUtils, languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import moment from 'moment';
import NumericFormat from 'react-number-format';

class UpdateOrderStatusModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStatus: [], selectedStatus: '',

        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('status')

        if (this.props.selectedOrder) {
            let dataSelectedStatus = this.buildDataInputSelect(this.props.selectedOrder.AllCode);
            this.setState({
                selectedStatus: dataSelectedStatus[0]
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataStatus = this.buildDataInputSelect(this.props.allCodesArr);
            this.setState({
                listStatus: dataStatus
            })
        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            if (this.props.actionResponse.errCode === 0) {
                this.props.closeModal()
            }
        }

        if (prevProps.selectedOrder !== this.props.selectedOrder) {
            let dataSelectedStatus = this.buildDataInputSelect(this.props.selectedOrder.AllCode);
            this.setState({
                selectedStatus: dataSelectedStatus[0]
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;



        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.valueVI;
                let labelEN = item.valueEN;

                obj.keyMap = item.keyMap;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });
        } else {
            let obj = {};
            let labelVI = inputData.valueVI;
            let labelEN = inputData.valueEN;

            obj.keyMap = inputData.keyMap;
            obj.label = language === languages.VI ? labelVI : labelEN;
            result.push(obj);
        }

        return result;
    }


    handleOnChange = (selectedStatus) => {
        this.setState({
            selectedStatus: selectedStatus
        })
    }

    handleUpdateBillStatus = async () => {
        let { selectedOrder } = this.props
        await this.props.updateBillStatus({
            billId: selectedOrder.id,
            statusKeyMap: this.state.selectedStatus.keyMap
        })
    }


    render() {
        let { listStatus, selectedStatus } = this.state
        let { selectedOrder, isOpenUpdateStatusModal, closeModal, lang } = this.props
        let orderedDate = moment(selectedOrder.orderedDate).format('DD/MM/YYYY')

        return (
            <>
                <Modal isOpen={isOpenUpdateStatusModal}
                    toggle={closeModal}
                    size='md'
                    centered>

                    <div className='sharing-modal-container'>

                        <div className='sharing-modal-header'>
                            Cập nhật trạng thái đơn hàng
                        </div>

                        <div>
                            <div className='row'>
                                <div className='col-12 form-group text-uppercase'>
                                    <label><b>Thông tin đơn hàng</b></label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Mã đơn hàng</label>
                                </div>
                                <div className='col-6 form-group'>
                                    <p>{selectedOrder.id}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Ngày đặt</label>
                                </div>
                                <div className='col-6 form-group'>
                                    <p>{orderedDate}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ và tên người nhận</label>
                                </div>
                                <div className='col-6 form-group'>
                                    <p>
                                        {selectedOrder && selectedOrder.UserAddress &&
                                            selectedOrder.UserAddress.fullName}
                                    </p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Tổng tiền</label>
                                </div>
                                <div className='col-6 form-group'>
                                    <p>
                                        <NumericFormat value={parseFloat(selectedOrder.totalPrice)}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            suffix={'đ'} /></p>
                                </div>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Trạng thái mới</label>
                            </div>
                            <div className='col-6 form-group'>
                                <Select
                                    value={selectedStatus}
                                    onChange={this.handleOnChange}
                                    options={listStatus}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedStatus" />
                            </div>
                        </div>


                        <div className='sharing-modal-buttons'>

                            <button className='add-btn'
                                onClick={() => this.handleUpdateBillStatus()}
                            >Save</button>
                            <button className='cancel-btn'
                                onClick={closeModal}
                            >Cancel</button>
                        </div>
                    </div>

                </Modal >

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        actionResponse: state.admin.actionResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        updateBillStatus: (inputData) => dispatch(actions.updateBillStatus(inputData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderStatusModal);
