import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ManageUser.scss';
import * as actions from "../../../../store/actions";

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        await this.props.getAllUser()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    renderUserTableData = () => {
        let { allUserArr } = this.props
        return (
            <>
                {allUserArr && allUserArr.length > 0 &&
                    allUserArr.map((item, index) => {
                        let firstName = item.firstName && item.firstName !== null ?
                            item.firstName : ''
                        let lastName = item.lastName && item.lastName !== null ?
                            item.lastName : ''
                        let gender = item.AllCode && item.AllCode.valueVI ? item.AllCode.valueVI : '';
                        console.log(gender)

                        return (
                            <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{firstName + ' ' + lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{gender}</td>
                                </tr>
                            </>
                        )
                    })

                }
            </>
        )
    };

    render() {
        console.log(this.props.allUserArr)

        return (
            <React.Fragment>
                <div className='sharing-manage-container'>
                    <div className='sharing-manage-title'>
                        Quản lý người dùng
                    </div>

                    <div className='manage-sharing-table'>
                        <table className='sharing-table'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>ID người dùng</th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUserTableData()}
                                {/* {this.renderUserTableData(rowsPerPage)} */}
                            </tbody>
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
        allUserArr: state.admin.allUserArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch(actions.getAllUser()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageUser));
