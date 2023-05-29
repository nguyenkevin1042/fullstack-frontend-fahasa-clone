import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './EditModal.scss';
import _ from 'lodash';
import Select from 'react-select';
import { languages } from '../../../../utils'

import * as actions from "../../../../store/actions";


class EditSubCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            categoryType: '',
            valueVI: '',
            valueVN: '',
            errResponse: [],

            selectedItem: ''
        };
    }

    componentDidMount() {
        // console.log("check props: ", this.props)
        let dataSelect = this.buildDataInputSelect(this.props.selectedItem);
        console.log(dataSelect)
        this.setState({
            selectedItem: this.props.selectedItem
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { selectedItem } = this.props
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.selectedItem !== this.props.selectedItem) {
            this.setState({
                id: selectedItem.id,
                categoryType: selectedItem.categoryType,
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
        // let labelVI = inputData.valueVI;
        // let labelEN = inputData.valueEN;

        obj.keyMap = inputData.categoryType;
        // obj.label = language === languages.VI ? labelVI : labelEN;
        result.push(obj);


        return result;
    }

    handleChange = (selectedItem) => {
        this.setState({
            categoryType: selectedItem.keyMap,
            // selectedCategory: selectedCategory
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

    render() {
        let { categoryType, valueVI, valueEN, selectedItem } = this.state;
        let { isModalOpened, closeEditCodeModel,
            listCategory } = this.props;
        console.log("check listCategory: ", listCategory)
        console.log("check selectedItem: ", selectedItem)
        return (
            <React.Fragment>

                <Modal isOpen={isModalOpened}
                    className={'sharing-edit-modal-container'}
                    size='lg'
                    centered>

                    <div className='sharing-edit-modal-title text-center'>
                        <h3>Cập nhật danh mục phụ</h3>
                    </div>

                    <div className='sharing-edit-section row'>
                        <div className='col-12 form-group'>
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
                            <label>Tiếng Việt</label>
                            <input className='form-control'
                                value={valueVI}
                                onChange={(event) => this.handleOnChangeInput(event, 'valueVI')} />
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
        // updateCodeRes: state.admin.updateCodeRes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // updateCode: (codeData) => dispatch(actions.updateCode(codeData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSubCategoryModal);
