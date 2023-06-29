import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { CommonUtils, languages } from '../../../../utils'
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
        document.title = "Dashboard | Nguyenkevin1042's Fahasa Clone"

        if (this.props.userInfo) {
            await this.props.getBillByUserId(this.props.userInfo.id)
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.userInfo !== this.props.userInfo) {
            await this.props.getBillByUserId(this.props.userInfo.id)
        }

        if (prevState.selectedOrder !== this.state.selectedOrder) {
            if (this.state.selectedOrder) {
                document.title = "Order #" + this.state.selectedOrder.id + " | Nguyenkevin1042's Fahasa Clone"
            } else {
                document.title = "Dashboard | Nguyenkevin1042's Fahasa Clone"
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

    handleReorder = async (selectedItem) => {
        let billProducts = selectedItem.BillProducts
        let { userInfo, actionResponse } = this.props
        let userCartId = this.props.userInfo.Cart.id

        billProducts.map(async (item) => {
            let productItem = item.Product
            let salePrice = CommonUtils.getSalePrice(productItem.price, productItem.discount)

            await this.props.addToCart({
                cartId: userCartId,
                productId: item.productId,
                quantity: item.quantity,
                productPrice: productItem.discount ? salePrice : productItem.price
            })
        })
        await this.props.getCartByUserId(userCartId)

        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }

    handleBackToDashboard = async () => {
        this.setState({
            selectedOrder: ''
        })
        await this.props.getBillByUserId(this.props.userInfo.id)
    }

    renderOrderData = () => {
        let { billData, lang } = this.props


        let billDataLimit7 = billData.slice(0, 7);

        return (
            <>
                {billDataLimit7 && billDataLimit7.length > 0 ?
                    billDataLimit7.map((item, index) => {
                        let orderedDate = moment(item.orderedDate).format('DD/MM/YYYY')
                        let labelStatusVI = item.AllCode ? item.AllCode.valueVI : ''
                        let labelStatusEN = item.AllCode ? item.AllCode.valueEN : ''


                        return (

                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{orderedDate}</td>
                                <td>
                                    {item.UserAddress && item.UserAddress.fullName &&
                                        item.UserAddress.fullName}
                                </td>
                                <td>
                                    <NumericFormat value={parseFloat(item.totalPrice)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </td>
                                <td>
                                    {lang === languages.VI ?
                                        labelStatusVI : labelStatusEN
                                    }
                                </td>
                                <td className='actions'>
                                    {item.status === 'S4' || item.status === 'S5' ?
                                        <>
                                            <p onClick={() => this.hanldeViewOrderDetail(item)}>
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                            <span>|</span>
                                            <p onClick={() => this.handleReorder(item)}>
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
            </>
        )

    }

    renderDefault = () => {
        let { actionResponse } = this.props
        let { message } = this.state

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
                        <thead>
                            <tr>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.total' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.dashboard.status' /></th>
                                <th className='col-2'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOrderData()}
                        </tbody>
                    </table>

                    <div className='no-order-text'>{message}</div>
                </div>
            </>
        )
    }


    render() {
        let { selectedOrder } = this.state
        let { userInfo, lang } = this.props

        console.log(this.props.billData)
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
        addToCart: (inputData) => dispatch(actions.addToCart(inputData)),
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));
