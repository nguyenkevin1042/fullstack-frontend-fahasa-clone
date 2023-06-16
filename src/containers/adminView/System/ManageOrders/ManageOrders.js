import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ManageOrders.scss';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import CustomPagination from '../../../../components/CustomPagination';
import moment from 'moment';
import NumericFormat from 'react-number-format';

import LoadingOverlay from 'react-loading-overlay'
import UpdateOrderStatusModal from './UpdateOrderStatusModal';

class ManageOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenUpdateStatusModal: false,
            listOrders: [],
            selectedOrder: '',

            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: ""
        };
    }

    async componentDidMount() {
        await this.props.getAllBill();

        if (this.props.allBillArr) {
            this.setState({
                totalRecords: this.props.allBillArr.length
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allBillArr !== this.props.allBillArr) {
            this.setState({
                listOrders: this.props.allBillArr
            });
        }
    }

    onChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
    };

    handleEdit = (item) => {
        this.setState({
            isOpenUpdateStatusModal: true,
            selectedOrder: item
        })
    }


    handleCloseUpdateStatusModal = async () => {
        this.setState({
            isOpenUpdateStatusModal: false
        })
        await this.props.getAllBill();

    }


    renderOrderTableData = (orders) => {
        let { lang } = this.props
        return (
            <>
                {orders && orders.length > 0 &&
                    orders.map((item, index) => {
                        let orderedDate = moment(item.orderedDate).format('DD/MM/YYYY')
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{orderedDate}</td>
                                <td>
                                    {item.UserAddress.fullName}
                                </td>
                                <td>
                                    <NumericFormat value={item.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </td>
                                <td>
                                    {lang === languages.VI ?
                                        item.AllCode.valueVI : item.AllCode.valueEN
                                    }
                                </td>

                                <td>
                                    <button className='btn-edit'
                                        onClick={() => this.handleEdit(item)}
                                    > <i className="fas fa-pencil-alt"></i></button>
                                    <button className='btn-delete'
                                    // onClick={() => this.handleDelete(item)}
                                    ><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })

                }
            </>
        )
    };


    render() {
        let { totalPages, currentPage, pageLimit,
            startIndex, endIndex, listOrders, selectedOrder, isOpenUpdateStatusModal } = this.state;
        let rowsPerPage = [];


        rowsPerPage = listOrders.slice(startIndex, endIndex + 1);

        return (
            <React.Fragment>
                <div className='sharing-manage-container'>
                    <div className='sharing-manage-title'>
                        Quản lý đơn hàng
                    </div>

                    <div className='manage-sharing-table'>
                        <table className='sharing-table'>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng#</th>
                                    <th>Ngày đặt</th>
                                    <th>Tên người nhận</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderOrderTableData(rowsPerPage)}
                            </tbody>
                        </table>

                        <CustomPagination
                            totalRecords={listOrders.length}
                            pageLimit={pageLimit || 5}
                            initialPage={1}
                            pagesToShow={5}
                            onChangePage={this.onChangePage}
                        />
                    </div>
                </div>

                <UpdateOrderStatusModal
                    isOpenUpdateStatusModal={isOpenUpdateStatusModal}
                    closeModal={this.handleCloseUpdateStatusModal}
                    selectedOrder={selectedOrder} />

            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allBillArr: state.admin.allBillArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBill: () => dispatch(actions.getAllBill()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageOrders));
