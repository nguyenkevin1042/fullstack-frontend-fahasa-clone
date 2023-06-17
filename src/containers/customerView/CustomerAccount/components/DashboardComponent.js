import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { languages } from '../../../../utils'
import './DashboardComponent.scss';
import * as actions from "../../../../store/actions";
import moment from 'moment';
import NumericFormat from 'react-number-format';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUserOrders: [],
            message: ''
        };
    }

    async componentDidMount() {
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

    renderOrderData = () => {
        let { billData, lang } = this.props

        return (
            <>
                {billData && billData.length > 0 ?
                    billData.map((item, index) => {
                        let orderedDate = moment(item.orderedDate).format('DD/MM/YYYY')
                        return (
                            <tr>
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
                                            <p>
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                            <span>|</span>
                                            <p>
                                                <FormattedMessage id='customer.account.dashboard.reorder' />
                                            </p>
                                        </> :
                                        <>
                                            <p>
                                                <FormattedMessage id='customer.account.dashboard.view-order' />
                                            </p>
                                        </>}
                                </td>
                            </tr>
                        )
                    }) :
                    <></>
                }
            </>
        )

    }


    render() {
        let { message } = this.state
        let { userInfo, lang, actionResponse } = this.props

        console.log(actionResponse)

        return (
            <React.Fragment>
                <div className='right-content-header'>
                    <FormattedMessage id='customer.account.dashboard.title' />
                </div>
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
                </div>

                <div className='recent-order'>
                    <div className='recent-order-title'>
                        <p className='title-text'>
                            <FormattedMessage id='customer.account.dashboard.recent-orders' />
                        </p>
                        {actionResponse.errCode === 0 ?
                            <p className='view-all-text'>
                                <FormattedMessage id='customer.account.dashboard.view-all' />
                            </p> : <></>}
                        {/* // <p className='view-all-text'>
                        //     <FormattedMessage id='customer.account.dashboard.view-all' />
                        // </p> */}
                    </div>
                    <div className='recent-order-table'>
                        {actionResponse.errCode === 0 ?
                            <table>
                                <tr>
                                    <th><FormattedMessage id='customer.account.dashboard.order-id' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.ordered-date' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.ship-to' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.total' /></th>
                                    <th><FormattedMessage id='customer.account.dashboard.status' /></th>

                                </tr>
                                {this.renderOrderData()}
                            </table> :
                            <div className='no-order-text'>{message}</div>}

                    </div>
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
