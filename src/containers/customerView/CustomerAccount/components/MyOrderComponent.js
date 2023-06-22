import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './MyOrderComponent.scss';

import { CommonUtils, languages } from '../../../../utils'
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
        document.title = "My Orders | Nguyenkevin1042's Fahasa Clone"

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

        if (prevState.selectedOrder !== this.state.selectedOrder) {
            if (this.state.selectedOrder) {
                document.title = "Order #" + this.state.selectedOrder.id + " | Nguyenkevin1042's Fahasa Clone"
            } else {
                document.title = "My Orders | Nguyenkevin1042's Fahasa Clone"
            }
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
            if (this.props.actionResponse.errCode === 0) {
                if (this.props.history) {
                    this.props.history.push("/cart");
                }
            }
        }
    }

    hanldeViewOrderDetail = (item) => {
        this.setState({
            selectedOrder: item
        })
    }

    handleReOrder = (selectedItem) => {
        let billProducts = selectedItem.BillProducts
        let { userInfo, actionResponse } = this.props
        actionResponse = ''

        billProducts.map(async (item) => {
            let productItem = item.Product
            let salePrice = CommonUtils.getSalePrice(productItem.price, productItem.discount)

            await this.props.addToCart({
                cartId: userInfo ? userInfo.Cart.id : '',
                productId: productItem.id,
                quantity: item.quantity,
                productPrice: productItem.discount ? salePrice : productItem.price
            })
        })
    }

    handleBackToOrderLists = async () => {
        this.setState({
            selectedOrder: ''
        })
        await this.props.getBillByUserId(this.props.userInfo.id)
    }

    renderOrderData = () => {
        let { lang } = this.props
        let { message, listUserOrders } = this.state

        return (
            <>
                {listUserOrders && listUserOrders.length > 0 ?
                    listUserOrders.map((item, index) => {
                        let orderedDate = moment(item.orderedDate).format('DD/MM/YYYY')
                        return (
                            <tr key={index} className='row'>
                                <td className='col-2 text-center'>{item.id}</td>
                                <td className='col-2'>{orderedDate}</td>
                                <td className='col-2'>
                                    {item.UserAddress.fullName}
                                </td>
                                <td className='col-2'>
                                    <NumericFormat value={parseFloat(item.totalPrice)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </td>
                                <td className='col-2'>
                                    {lang === languages.VI ?
                                        item.AllCode.valueVI : item.AllCode.valueEN
                                    }
                                </td>
                                <td className='actions col-2'>
                                    {item.status === 'S4' || item.status === 'S5' ?
                                        <>
                                            <p onClick={() => this.hanldeViewOrderDetail(item)}>
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                            <span>|</span>
                                            <p onClick={() => this.handleReOrder(item)}>
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
                    <table >
                        <tr className='row'>
                            <th className='col-2 text-center'><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                            <th className='col-2'><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                            <th className='col-2 '><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
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
                            <MyOrderDetailComponent selectedOrder={selectedOrder}
                                backToOrderList={this.handleBackToOrderLists} /> :
                            this.renderDefault()}
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
        addToCart: (inputData) => dispatch(actions.addToCart(inputData)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderComponent));
