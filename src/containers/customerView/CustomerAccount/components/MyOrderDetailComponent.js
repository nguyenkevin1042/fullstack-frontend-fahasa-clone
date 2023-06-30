import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './MyOrderDetailComponent.scss';
import * as actions from "../../../../store/actions";
import moment from 'moment';
import NumericFormat from 'react-number-format';
import { CommonUtils, languages } from '../../../../utils';

class MyOrderDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: '',
            orderStatusColor: '',
            orderData: {}
        };
    }

    async componentDidMount() {
        let id = this.props.selectedOrder.id
        await this.props.getBillById(id)
        this.setState({
            orderData: this.props.singleOrder
        })

        let labelVI = this.state.orderData.AllCode.valueVI
        let labelEN = this.state.orderData.AllCode.valueEN
        this.setState({
            orderStatus: this.props.lang === languages.VI ? labelVI : labelEN,
            orderStatusColor: this.getOrderStatusColor()
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            let labelVI = this.props.selectedOrder.AllCode.valueVI
            let labelEN = this.props.selectedOrder.AllCode.valueEN
            this.setState({
                orderStatus: this.props.lang === languages.VI ? labelVI : labelEN,
            })
        }

        // if (prevProps.selectedOrder !== this.props.selectedOrder) {
        //     let id = this.props.selectedOrder.id
        //     await this.props.getBillById(id)
        //     this.setState({
        //         orderData: this.props.singleOrder
        //     })
        // }
    }

    handleCancelOrder = async () => {
        let { selectedOrder } = this.props

        await this.props.updateBillStatus({
            billId: selectedOrder.id,
            statusKeyMap: 'S5'
        })
        this.handleGoBack()
    }

    handleGoBack = () => {
        let { backToDashboard, backToOrderList } = this.props
        if (backToDashboard) {
            backToDashboard()
        }
        if (backToOrderList) {
            backToOrderList()
        }
    }

    handleReOrder = async () => {
        let billProducts = this.state.orderData.BillProducts
        let userCartId = this.props.userInfo.Cart.id

        billProducts.map(async (item) => {
            let productItem = item.Product
            let salePrice = CommonUtils.getSalePrice(productItem.price, productItem.discount)

            await this.props.addToCart({
                cartId: userCartId,
                productId: productItem.id,
                quantity: item.quantity,
                productPrice: productItem.discount ? salePrice : productItem.price
            })
        })

        await this.props.getCartByUserId(userCartId)

        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }

    getOrderStatusColor = () => {
        let color;
        let status = this.state.orderData.status
        switch (status) {
            case 'S4':
                color = 'green'
                break;
            case 'S5':
                color = 'red'
                break;

            default:
                color = 'yellow'
                break;
        }
        return color
    }

    renderProductData = () => {
        let billProducts = this.state.orderData.BillProducts
        return (
            <>
                {billProducts && billProducts.length > 0 &&
                    billProducts.map((item, index) => {
                        let imageBase64 = '';
                        let productData = item.Product;
                        if (productData.image) {
                            imageBase64 = new Buffer(productData.image, 'base64').toString('binary');
                        }

                        return (
                            <tr key={item.id} className='product-item row'>
                                <td className='col-2'>
                                    <div className='product-img'
                                        style={{
                                            backgroundImage: "url(" + imageBase64 + ")"
                                        }}></div>
                                </td>
                                <td className='col-3'>{productData.name}</td>
                                <td className='col-2 text-center'>{productData.id}</td>
                                <td className='col-2 '>
                                    <NumericFormat value={parseFloat(productData.price)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </td>
                                <td className='col-1'>{item.quantity}</td>
                                <td className='col-2 text-left'>
                                    <NumericFormat value={parseFloat(item.totalPrice)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </td>
                            </tr>
                        )

                    })
                }
            </>
        )
    }

    render() {
        let { selectedOrder } = this.props
        let { orderStatus, orderStatusColor, orderData } = this.state
        let orderedDate = moment(orderData.orderedDate).format('DD/MM/YYYY')

        return (
            <React.Fragment>
                <div className='order-detail-container'>
                    <div className='order-detail-content-up row'>

                        <div className='order-detail-text col-12 col-lg-7'>
                            <div className='order-status'>
                                <span className={orderStatusColor}>{orderStatus}</span>
                            </div>
                            <div className='sharing-detail-text'>
                                <label><FormattedMessage id='customer.account.order-detail.order-id' />:</label>
                                <b>{selectedOrder.id}</b>
                            </div>
                            <div className='sharing-detail-text'>
                                <label><FormattedMessage id='customer.account.order-detail.ordered-date' />:</label>
                                <b>{orderedDate}</b>
                            </div>
                            <div className='sharing-detail-text'>
                                <label><FormattedMessage id='customer.account.order-detail.total' />:</label>
                                <b>
                                    <NumericFormat value={parseFloat(selectedOrder.totalPrice)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </b>
                            </div>
                            <div className='sharing-detail-text'>
                                <label><FormattedMessage id='customer.account.order-detail.quantity' />:</label>
                                <b>{orderData.BillProducts && orderData.BillProducts.length}</b>
                            </div>
                        </div>

                        <div className='review-order col-12 col-lg-5'>
                            {orderData.status === 'S1' || orderData.status === 'S2' ?
                                <button className='cancel-btn'
                                    onClick={() => this.handleCancelOrder()}>
                                    <FormattedMessage id='customer.account.order-detail.cancel-order' />
                                </button> :
                                <></>
                            }

                            {orderData.status === 'S4' || orderData.status === 'S5' ?
                                <button className='cancel-btn'
                                    onClick={() => this.handleReOrder()}>
                                    <FormattedMessage id='customer.account.order-detail.reorder' />
                                </button> :
                                <></>
                            }
                        </div>
                    </div>

                    <div className='order-detail-content-down'>
                        <table className='container-fluid'>
                            <tr className='row'>
                                <th className='col-2 text-center'><FormattedMessage id='customer.account.order-detail.product-image' /></th>
                                <th className='col-3'><FormattedMessage id='customer.account.order-detail.product-name' /></th>
                                <th className='col-2 text-center'><FormattedMessage id='customer.account.order-detail.product-id' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.order-detail.product-price' /></th>
                                <th className='col-1'><FormattedMessage id='customer.account.order-detail.quantity-ordered' /></th>
                                <th className='col-2'><FormattedMessage id='customer.account.order-detail.product-total' /></th>
                            </tr>
                            {this.renderProductData()}
                        </table>
                    </div>

                    <div className='back-to-orders'>
                        <p onClick={() => this.handleGoBack()}> &#60;&#60; <FormattedMessage id='customer.account.order-detail.back' /></p>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        actionResponse: state.admin.actionResponse,
        singleOrder: state.user.singleOrder,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCartByUserId: (inputUserId) => dispatch(actions.getCartByUserId(inputUserId)),
        getBillById: (inputId) => dispatch(actions.getBillById(inputId)),
        updateBillStatus: (inputData) => dispatch(actions.updateBillStatus(inputData)),
        addToCart: (inputData) => dispatch(actions.addToCart(inputData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderDetailComponent));
