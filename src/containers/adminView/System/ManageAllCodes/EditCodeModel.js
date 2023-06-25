import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './EditCodeModel.scss';
import { Modal } from 'reactstrap'

import _ from 'lodash';
import * as actions from "../../../../store/actions";



class EditCodeModel extends Component {
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
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleUpdate = async () => {
        await this.props.updateCode({
            id: this.state.id,
            type: this.state.type,
            keyMap: this.state.keyMap,
            valueVI: this.state.valueVI,
            valueEN: this.state.valueEN,
        })


        if (this.props.updateCodeRes.errCode === 0) {
            this.props.closeEditCodeModel();
        }
    }

    render() {
        let { type, keyMap, valueVI, valueEN } = this.state;
        let { isModalOpened, closeEditCodeModel } = this.props;
        return (
            <React.Fragment>

                <Modal isOpen={isModalOpened}
                    className={'edit-code-model-container'}
                    size='lg'
                    centered>

                    <div className='edit-code-model-title text-center'>
                        <h3>Cập nhật code</h3>
                    </div>

                    <div className='edit-code-section row'>
                        <div className='col-6 form-group'>
                            <label>Loại</label>
                            <input className='form-control'
                                value={type}
                                onChange={(event) => this.handleOnChangeInput(event, 'type')} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Mã</label>
                            <input className='form-control'
                                value={keyMap}
                                onChange={(event) => this.handleOnChangeInput(event, 'keyMap')} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Giá trị bằng Tiếng Việt</label>
                            <input className='form-control'
                                value={valueVI}
                                onChange={(event) => this.handleOnChangeInput(event, 'valueVI')} />
                        </div>
                        <div className='col-6'>
                            <label>Giá trị bằng Tiếng Anh</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCodeModel);
