import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SignUpModel.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import _ from 'lodash';
import { createNewUserAPI } from '../../../../services/userService';

import * as actions from "../../../../store/actions";



class SignUpModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            message: ''
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.errResponse !== this.props.errResponse) {
            this.setState({
                message: this.props.errResponse.message
            })
        }


    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleSignUp = async () => {
        let { errResponse } = this.props;

        await this.props.createNewUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            isAdmin: false
        });

        if (errResponse.errCode === 0) {
            this.props.closeSignUpModel();
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }



    render() {
        let { firstName, lastName, email, password, address, phoneNumber, message } = this.state;
        let { isModalOpened, closeSignUpModel } = this.props;
        return (
            <React.Fragment>

                <Modal isOpen={isModalOpened}
                    className={'sign-up-model-container'}
                    size='lg'
                    centered>
                    <div className='sign-up-model-content'>

                        <div className="sign-up-model-header text-center">
                            <h3>Sign up new account</h3>
                        </div>
                        <div className="sign-up-model-body row">
                            <div className='col-6 form-group'>
                                <label>First Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={firstName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                    required />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Last Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={lastName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                    required />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    value={email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    required />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    value={password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                    required />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Address</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Phone Number</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    required />
                            </div>
                            <div className='col-12 error-message mt-4'>
                                {message}
                            </div>
                        </div>


                        <div className="sign-up-model-footer">
                            <button className='btn btn-sign-up'
                                onClick={() => this.handleSignUp()}>
                                Sign Up
                            </button>
                            <button className='btn btn-cancel'
                                onClick={closeSignUpModel}>
                                Cancel
                            </button>
                        </div>
                    </div>


                </Modal >
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        errResponse: state.admin.signUpResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModel);
