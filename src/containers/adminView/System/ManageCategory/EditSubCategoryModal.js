import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap'
import './EditModal.scss';
import _ from 'lodash';
import Select from 'react-select';
import { CommonUtils, languages } from '../../../../utils'

import * as actions from "../../../../store/actions";


class EditSubCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            category: '',
            keyName: '',
            valueVI: '',
            valueEN: '',

            errResponse: [],
            selectedItem: ''
        };
    }

    componentDidMount() {
        let dataSelect = this.buildDataInputSelect(this.props.selectedItem);
        this.setState({
            selectedItem: dataSelect
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { selectedItem } = this.props
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.selectedItem !== this.props.selectedItem) {
            this.setState({
                id: selectedItem.id,
                category: selectedItem.category,
                keyName: selectedItem.keyName,
                valueVI: selectedItem.valueVI,
                valueEN: selectedItem.valueEN,
            })
        }

        if (prevProps.selectedItem !== this.props.selectedItem) {
            let dataSelect = this.buildDataInputSelect(this.props.selectedItem);
            this.setState({
                selectedItem: dataSelect
            })
        }

        // if (prevProps.errResponse !== this.props.errResponse) {
        //     this.setState({
        //         message: this.props.errResponse.message
        //     })
        // }


    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;


        let obj = {};
        let labelVI = inputData.valueVI;
        let labelEN = inputData.valueEN;

        obj.keyName = inputData.category;
        obj.label = language === languages.VI ? labelVI : labelEN;
        result.push(obj);


        return result;
    }

    handleChange = (selectedItem) => {
        this.setState({
            category: selectedItem.keyName,
            selectedItem: selectedItem
        })
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleUpdate = async () => {
        // this.props.closeEditCodeModel();
        // await this.props.updateCode({
        //     id: this.state.id,
        //     type: this.state.type,
        //     keyMap: this.state.keyMap,
        //     valueVI: this.state.valueVI,
        //     valueEN: this.state.valueEN,
        // })
        // let { errResponse } = this.state;


        // if (errResponse.errCode === 0) {
        //     this.props.closeEditCodeModel();
        // }
    }

    handleOnChangeInputValueVI = (event) => {
        let data = event.target.value
        let keyName = CommonUtils.convertToKeyName(data)
        this.setState({
            valueVI: data,
            keyName: keyName
        })
    }

    render() {
        let { category, keyName, valueVI, valueEN, selectedItem } = this.state;
        let { isModalEditOpened, closeEditCodeModel,
            listCategory } = this.props;

        return (
            <React.Fragment>

                <Modal isOpen={isModalEditOpened}
                    className={'sharing-edit-modal-container'}
                    size='lg'
                    centered>

                    <div className='sharing-edit-modal-title text-center'>
                        <h3>Cập nhật danh mục phụ</h3>
                    </div>

                    <div className='sharing-edit-section row'>
                        <div className='col-6 form-group'>
                            <label>Danh mục chính</label>
                            <Select
                                value={selectedItem}
                                onChange={this.handleChange}
                                options={listCategory}
                                // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                name="selectedCategory"
                            />

                        </div>
                        <div className='col-6 form-group'>
                            <label>Mã danh mục phụ</label>
                            <input className='form-control'
                                value={keyName}
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
        errResponse: state.admin.errResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSubCategory: (inputData) => dispatch(actions.updateSubCategory(inputData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSubCategoryModal);
