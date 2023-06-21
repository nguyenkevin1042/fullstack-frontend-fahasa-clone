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
            orderStatusColor: ''
        };
    }

    componentDidMount() {
        let labelVI = this.props.selectedOrder.AllCode.valueVI
        let labelEN = this.props.selectedOrder.AllCode.valueEN

        if (this.props.selectedOrder) {
            this.setState({
                orderStatus: this.props.lang === languages.VI ? labelVI : labelEN,
                orderStatusColor: this.getOrderStatusColor()
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            let labelVI = this.props.selectedOrder.AllCode.valueVI
            let labelEN = this.props.selectedOrder.AllCode.valueEN
            this.setState({
                orderStatus: this.props.lang === languages.VI ? labelVI : labelEN
            })
        }

        if (prevProps.actionResponse !== this.props.actionResponse) {
            if (this.props.actionResponse.errCode === 0) {
                // if (this.props.history) {
                //     this.props.history.push("/cart");
                // }
            }
        }
    }

    handleCancelOrder = async () => {
        let { selectedOrder } = this.props

        await this.props.updateBillStatus({
            billId: selectedOrder.id,
            statusKeyMap: 'S5'
        })
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

    handleReOrder = () => {
        let billProducts = this.props.selectedOrder.BillProducts
        let { userInfo } = this.props

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

        if (this.props.history) {
            this.props.history.push("/cart");
        }
    }

    getOrderStatusColor = () => {
        let color;
        let status = this.props.selectedOrder.status
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
        let billProducts = this.props.selectedOrder.BillProducts
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
                            <tr key={index} className='product-item row'>
                                <td className='col-2'>
                                    <div className='product-img'
                                        style={{
                                            backgroundImage: "url(" + imageBase64 + ")"
                                        }}></div>
                                </td>
                                <td className='col-3'>{productData.name}</td>
                                <td className='col-2 text-center'>{productData.id}</td>
                                <td className='col-2 '>
                                    <NumericFormat value={productData.price}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </td>
                                <td className='col-1'>{item.quantity}</td>
                                <td className='col-2 text-left'>
                                    <NumericFormat value={item.totalPrice}
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
        let { selectedOrder, backToOrderList } = this.props
        let { orderStatus, orderStatusColor } = this.state
        let orderedDate = moment(selectedOrder.orderedDate).format('DD/MM/YYYY')

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
                                    <NumericFormat value={selectedOrder.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        suffix={'đ'} />
                                </b>
                            </div>
                            <div className='sharing-detail-text'>
                                <label><FormattedMessage id='customer.account.order-detail.quantity' />:</label>
                                <b>{selectedOrder.BillProducts.length}</b>
                            </div>
                        </div>

                        <div className='review-order col-12 col-lg-5'>
                            {selectedOrder.status === 'S1' || selectedOrder.status === 'S2' ?
                                <button className='cancel-btn'
                                    onClick={() => this.handleCancelOrder()}>
                                    <FormattedMessage id='customer.account.order-detail.cancel-order' />
                                </button> :
                                <></>
                            }

                            {selectedOrder.status === 'S4' || selectedOrder.status === 'S5' ?
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateBillStatus: (inputData) => dispatch(actions.updateBillStatus(inputData)),
        addToCart: (inputData) => dispatch(actions.addToCart(inputData)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderDetailComponent));
