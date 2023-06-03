import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './EditModal.scss';
import { CommonUtils, languages } from '../../../../utils'
import _ from 'lodash';
import * as actions from "../../../../store/actions";



class EditCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            type: '',
            keyMap: '',
            valueVI: '',
            valueVN: '',
            errResponse: []
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { selectedItem } = this.props
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.selectedItem !== this.props.selectedItem) {
            this.setState({
                id: selectedItem.id,
                type: selectedItem.type,
                keyMap: selectedItem.keyMap,
                valueVI: selectedItem.valueVI,
                valueEN: selectedItem.valueEN,
            })
        }

        if (prevProps.updateCodeRes !== this.props.updateCodeRes) {
            this.setState({
                errResponse: this.props.updateCodeRes
            })
        }

        // if (prevProps.errResponse !== this.props.errResponse) {
        //     this.setState({
        //         message: this.props.errResponse.message
        //     })
        // }


    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleUpdate = async () => {
        // this.props.closeEditCodeModel();
        await this.props.updateCode({
            id: this.state.id,
            type: this.state.type,
            keyMap: this.state.keyMap,
            valueVI: this.state.valueVI,
            valueEN: this.state.valueEN,
        })
        let { errResponse } = this.state;


        if (errResponse.errCode === 0) {
            this.props.closeEditCodeModel();
        }
    }

    handleOnChangeInputValueVI = (event) => {
        let data = event.target.value
        let keyName = CommonUtils.convertToKeyName(data)
        this.setState({
            valueVI: data,
            keyMap: keyName
        })
    }


    render() {
        let { type, keyMap, valueVI, valueEN } = this.state;
        let { isModalOpened, closeEditCodeModel } = this.props;
        return (
            <React.Fragment>

                <Modal isOpen={isModalOpened}
                    className={'sharing-edit-modal-container'}
                    size='lg'
                    centered>

                    <div className='sharing-edit-modal-title text-center'>
                        <h3>Cập nhật danh mục chính</h3>
                    </div>

                    <div className='sharing-edit-section row'>
                        <div className='col-6 form-group'>
                            <label>Loại</label>
                            <input className='form-control'
                                value={type}
                                readOnly />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Mã</label>
                            <input className='form-control'
                                value={keyMap}
                                // onChange={(event) => this.handleOnChangeInput(event, 'keyMap')}
                                readOnly />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Tiếng Việt</label>
                            <input className='form-control'
                                value={valueVI}
                                onChange={(event) => this.handleOnChangeInputValueVI(event)} />
                        </div>
                        <div className='col-6'>
                            <label>Tiếng Anh</label>
                            <input className='form-control'
                                value={valueEN}
                                onChange={(event) => this.handleOnChangeInput(event, 'valueEN')} />
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleUpdate()}>Update</button>
                        </div>
                        <div className='col-6 form-group'>
                            <button className='btn btn-secondary'
                                onClick={closeEditCodeModel}>Close</button>
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
        updateCodeRes: state.admin.updateCodeRes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCode: (codeData) => dispatch(actions.updateCode(codeData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);
