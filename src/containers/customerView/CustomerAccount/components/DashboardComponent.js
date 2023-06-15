import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { languages } from '../../../../utils'
import './DashboardComponent.scss';
import * as actions from "../../../../store/actions";

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

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


    }


    render() {
        let { userInfo, lang } = this.props
        // let firstName = userInfo.firstName ? userInfo.firstName : ''
        // let lastName = userInfo.lastName ? userInfo.lastName : ''
        // let labelVI = userInfo.firstName + " " + userInfo.lastName;
        // let labelEN = userInfo.lastName + " " + userInfo.firstName;
        // let customerName = lang === languages.VI ? labelVI : labelEN

        console.log(this.props.billData)
        return (
            <React.Fragment>
                <div className='right-content-header'>
                    <FormattedMessage id='customer.account.dashboard' />
                </div>
                <div className='dashboard-customer'>
                    <div className='col-12'>
                        <label>Full Name:</label>
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
                        <label>Email:</label>
                        <b className='mx-3'>{userInfo && <>{userInfo.email}</>}</b>
                    </div>
                    <div className='col-12'>
                        <label>Member Level:</label>
                        <b className='mx-3'>Member</b>
                    </div>
                </div>

                <div className='recent-order'>
                    <div className='recent-order-title'>
                        <p className='title-text'>Recent Orders</p>
                        <p className='view-all-text'>View All</p>
                    </div>
                    <div className='recent-order-table'>
                        <table>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Ship To</th>
                                <th>Total Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>401050096</td>
                                <td>6/16/2022	</td>
                                <td>Tiến Nguyễn Văn</td>
                                <td>đ573,000.00</td>
                                <td>Completed</td>
                                <td className='actions'>
                                    <p>View Order</p>
                                    <span>|</span>
                                    <p>Reorder</p>
                                </td>
                            </tr>
                        </table>
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
