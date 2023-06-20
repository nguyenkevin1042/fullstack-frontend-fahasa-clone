import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './MyOrderComponent.scss';

import { languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import moment from 'moment';
import NumericFormat from 'react-number-format';
import MyOrderDetailComponent from './MyOrderDetailComponent';

class MyOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUserOrders: [],
            selectedOrder: '',
            message: ''
        };
    }

    async componentDidMount() {
        if (this.props.userInfo) {
            await this.props.getBillByUserId(this.props.userInfo.id)
        }
        this.setState({
            listUserOrders: this.props.billData
        })
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

    renderOrderData = () => {
        let { billData, lang } = this.props
        let { message, listUserOrders } = this.state

        return (
            <>
                {listUserOrders && listUserOrders.length > 0 ?
                    listUserOrders.map((item, index) => {
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
                                            <p onClick={() => this.hanldeViewOrderDetail(item)} >
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                        </>}
                                </td>
                            </tr >
                        )
                    }) :
                    <div className='no-order-text'>{message}</div>
                }
            </>
        )

    }

    renderDefault = () => {
        return (
            <>
                <div className='recent-order-table'>
                    <table>
                        <tr>
                            <th><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                            <th><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                            <th><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
                            <th><FormattedMessage id='customer.account.dashboard.total' /></th>
                            <th><FormattedMessage id='customer.account.dashboard.status' /></th>

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

        console.log(selectedOrder)

        return (
            <div className='right-content-my-order'>
                {/* {selectedOrder ?
                            <></> :} */}
                <div className='right-content-header'>
                    {selectedOrder ?
                        <FormattedMessage id='customer.account.order-detail.title' /> :
                        <FormattedMessage id='customer.account.my-orders.title' />
                    }
                </div>

                <div>
                    <div className='recent-order'>
                        {selectedOrder ?
                            <MyOrderDetailComponent selectedOrder={selectedOrder} /> :
                            this.renderDefault()}


                        {/* <div className='recent-order-table'>
                            <table>
                                <tr>
                                    <th><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.total' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.status' /></th>

                                </tr>
                                {this.renderOrderData()}
                            </table>
                        </div> */}
                    </div >
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderComponent));
