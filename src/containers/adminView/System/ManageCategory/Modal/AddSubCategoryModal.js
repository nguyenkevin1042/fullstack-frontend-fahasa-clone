import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { CommonUtils, languages } from '../../../../../utils'
import { Modal } from 'reactstrap'
import Select from 'react-select';
import * as actions from "../../../../../store/actions";

class AddSubCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            keyName: '',
            valueVI: '',
            valueEN: '',
            listCategory: [],
            selectedCategory: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllCodesByType('category')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === "category") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
        }

        return result;
    }

    handleChange = (selectedCategory) => {
        this.setState({
            category: selectedCategory.keyName,
            selectedCategory: selectedCategory
        })
    }

    handleSaveNewSubCategory = async () => {
        await this.props.addNewSubCategory({
            category: this.state.category,
            keyName: this.state.keyName,
            valueVI: this.state.valueVI,
            valueEN: this.state.valueEN,
        })
        if (this.props.actionResponse.errCode === 0) {
            this.handleClearAllInput()
            this.props.closeAddSubCategoryModel()
        }

    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleClearAllInput = () => {
        this.setState({
            keyName: '',
            selectedCategory: '',
            valueVI: '',
            valueEN: '',
        })
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
        let { valueVI, valueEN, keyName, listCategory, selectedCategory,
            isModalEditOpened, selectedItem } = this.state;
        let { isModalAddOpened, closeAddSubCategoryModel } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={isModalAddOpened}
                    toggle={closeAddSubCategoryModel}
                    className={'sharing-edit-modal-container'}
                    size='lg'
                    centered>

                    <div className='sharing-edit-modal-title text-center'>
                        <h3>Thêm danh mục phụ</h3>
                    </div>

                    <div className='sharing-edit-section row'>
                        <div className='col-6 form-group'>
                            <label>Danh mục chính</label>
                            <Select
                                value={selectedCategory}
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
                        <div className='col-4'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveNewSubCategory()}>Save</button>
                        </div>
                        <div className='col-4 form-group'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleClearAllInput()} > Reset</button>
                        </div>
                        <div className='col-4 form-group'>
                            <button className='btn btn-secondary'
                                onClick={closeAddSubCategoryModel}>Close</button>
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
        allCodesArr: state.admin.allCodesArr,
        actionResponse: state.admin.actionResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewSubCategory: (inputData) => dispatch(actions.addNewSubCategory(inputData)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSubCategoryModal));
