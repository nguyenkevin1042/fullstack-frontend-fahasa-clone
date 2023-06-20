import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { languages } from '../../../../utils'
import './DashboardComponent.scss';
import * as actions from "../../../../store/actions";
import moment from 'moment';
import NumericFormat from 'react-number-format';
import MyOrderDetailComponent from './MyOrderDetailComponent';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUserOrders: [],
            message: '',
            selectedOrder: '',
        };
    }

    async componentDidMount() {
        document.title = "Account | Nguyenkevin1042's Fahasa Clone"

        if (this.props.userInfo) {
            await this.props.getBillByUserId(this.props.userInfo.id)
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.billData !== this.props.billData) {
            this.setState({
                listUserOrders: this.props.billData
            })
        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            this.setState({
                message: this.props.lang === languages.VI ?
                    this.props.actionResponse.messageVI : this.props.actionResponse.messageEN
            })
        }
    }

    hanldeViewOrderDetail = (item) => {
        this.setState({
            selectedOrder: item
        })
    }

    handleBackToDashboard = async () => {
        this.setState({
            selectedOrder: ''
        })
        await this.props.getBillByUserId(this.props.userInfo.id)
    }

    renderOrderData = () => {
        let { billData, lang, userInfo, actionResponse } = this.props
        let { listUserOrders, message } = this.state

        let billDataLimit7 = billData.slice(0, 7);

        return (
            <>
                {billDataLimit7 && billDataLimit7.length > 0 ?
                    billDataLimit7.map((item, index) => {
                        let orderedDate = moment(item.orderedDate).format('DD/MM/YYYY')

                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{orderedDate}</td>
                                <td>
                                    {item.UserAddress && item.UserAddress.fullName &&
                                        item.UserAddress.fullName}
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
                                <td className='actions'>
                                    {item.status === 'S4' || item.status === 'S5' ?
                                        <>
                                            <p onClick={() => this.hanldeViewOrderDetail(item)}>
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                            <span>|</span>
                                            <p>
                                                <FormattedMessage id='customer.account.dashboard.reorder' />
                                            </p>
                                        </> :
                                        <>
                                            <p onClick={() => this.hanldeViewOrderDetail(item)}>
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                        </>}
                                </td>
                            </tr>
                        )
                    }) :
                    <></>}

                <div className='no-order-text'>{message}</div>
            </>
        )

    }

    renderDefault = () => {
        let { actionResponse } = this.props
        return (
            <>
                <div className='recent-order-title'>
                    <p className='title-text'>
                        <FormattedMessage id='customer.account.dashboard.recent-orders' />
                    </p>
                    {actionResponse.errCode === 0 ?
                        <p className='view-all-text'>
                            <FormattedMessage id='customer.account.dashboard.view-all' />
                        </p> : <></>}
                </div>
                <div className='recent-order-table'>
                    <table>
                        <tr>
                            <th className='col-2'><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                            <th className='col-2'><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                            <th className='col-2'><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
                            <th className='col-2'><FormattedMessage id='customer.account.dashboard.total' /></th>
                            <th className='col-2'><FormattedMessage id='customer.account.dashboard.status' /></th>
                            <th className='col-2'></th>
                        </tr>
                        {this.renderOrderData()}
                    </table>
                </div>
            </>
        )
    }


    render() {
        let { message, selectedOrder } = this.state
        let { userInfo, lang, actionResponse } = this.props

        return (
            <React.Fragment>
                <div className='right-content-header'>
                    {selectedOrder ?
                        <FormattedMessage id='customer.account.order-detail.title' /> :
                        <FormattedMessage id='customer.account.dashboard.title' />
                    }

                </div>

                {selectedOrder ? <></> :
                    <div className='dashboard-customer'>
                        <div className='col-12'>
                            <label><FormattedMessage id='customer.account.dashboard.full-name' />:</label>
                            {userInfo ?
                                <>
                                    {lang === languages.VI ?
                                        <b className='mx-3'>{userInfo.firstName} {userInfo.lastName}</b> :
                                        <b className='mx-3'>{userInfo.lastName} {userInfo.firstName}</b>
                                    }
                                </>
                                :
                                <p><FormattedMessage id="customer.homepage.header.account.title" /></p>
                            }

                            {/* <b className='mx-3'>{ userInfo.firstName } {userInfo.lastName}</b> */}
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id='customer.account.dashboard.email' />:</label>
                            <b className='mx-3'>{userInfo && <>{userInfo.email}</>}</b>
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id='customer.account.dashboard.member-level' />:</label>
                            <b className='mx-3'>Member</b>
                        </div>
                    </div>}


                <div className='recent-order'>
                    {selectedOrder ?
                        <MyOrderDetailComponent selectedOrder={selectedOrder}
                            backToDashboard={this.handleBackToDashboard} /> :
                        this.renderDefault()}
                    {/* <div className='recent-order-title'>
                        <p className='title-text'>
                            <FormattedMessage id='customer.account.dashboard.recent-orders' />
                        </p>
                        {actionResponse.errCode === 0 ?
                            <p className='view-all-text'>
                                <FormattedMessage id='customer.account.dashboard.view-all' />
                            </p> : <></>}
                    </div>
                    <div className='recent-order-table'>
                        <table>
                            <tr>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.total' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.status' /></th>
                                <th className='col-2'></th>
                            </tr>
                            {this.renderOrderData()}
                        </table>
                    </div> */}
                </div >
            </React.Fragment >
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        billData: state.user.billData,
        actionResponse: state.user.actionResponse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBillByUserId: (inputUserId) => dispatch(actions.getBillByUserId(inputUserId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));
