import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { CommonUtils, KeyCodeUtils, languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import Select from 'react-select';
import EditSubCategoryModal from './EditSubCategoryModal';

class ManageSubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            keyName: '',
            valueVI: '',
            valueEN: '',
            listCategory: [],
            listSubCategory: [],
            selectedCategory: '',

            selectedItem: '',
            isModalOpened: false

        };
    }

    componentDidMount() {
        this.props.fetchAllSubCategory();
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

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allSubCategoryArr, "category");
            this.setState({
                listSubCategory: this.props.allSubCategoryArr
            })
        }

    }

    handleConvertToKeyName = (inputName) => {
        inputName = this.handleConvertToNonAccentVietnamese(inputName)
        inputName = inputName.split(' - ').join('-');
        inputName = inputName.split(' ').join('-');
        inputName = inputName.toLowerCase();
        this.setState({
            keyName: inputName
        })
        return inputName;
    }

    handleConvertToNonAccentVietnamese = (string) => {
        string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        string = string.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        string = string.replace(/đ/g, "d");

        string = string.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
        string = string.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
        string = string.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
        string = string.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
        string = string.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
        string = string.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
        string = string.replace(/Đ/g, "d");

        return string;
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
        if (this.props.errResponse.errCode === 0) {
            this.handleClearAllInput();
            this.props.fetchAllSubCategory();
            this.props.fetchAllCodesByType('category')
        }

    }

    handleEdit = (item) => {
        this.setState({
            selectedItem: item,
            isModalOpened: true
        })
    }

    handleDelete = (item) => {
        this.props.deleteSubCategory(item.id);
    }

    handleCloseEditModel = () => {
        this.setState({
            isModalOpened: false
        })
        this.props.fetchAllSubCategory();
        // this.props.fetchAllCodesByType('category')
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
            // type: '',
            valueVI: '',
            valueEN: '',
        })


    }

    handleOnChangeInputValueVI = (event) => {
        let data = event.target.value
        let keyName = this.handleConvertToKeyName(data)
        this.setState({
            valueVI: data,
            keyName: keyName
        })
    }

    renderSubCategoriesTableData() {
        let { listSubCategory } = this.state
        return (
            <>
                {listSubCategory && listSubCategory.length > 0 &&
                    listSubCategory.map((item, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.category}</td>
                                    <td>{item.keyName}</td>
                                    <td>{item.valueVI}</td>
                                    <td>{item.valueEN}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEdit(item)}
                                        > <i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDelete(item)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </ >
                        )
                    })

                }
            </>
        )
    }

    render() {
        let { valueVI, valueEN, keyName, listCategory, selectedCategory,
            isModalOpened, selectedItem } = this.state;

        return (
            <React.Fragment>
                <div className='manage-category-container'>
                    <div className='manage-category-title'>
                        Quản lý danh mục phụ
                    </div>

                    <div className='manage-category-add-section row'>
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
                        <div className='col-6'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveNewSubCategory()}>Save</button>
                        </div>
                        <div className='col-6 form-group'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleClearAllInput()} > Reset</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className='manage-sharing-table'>
                                <table className='sharing-table'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Mã danh mục chính</th>
                                            <th>Mã danh mục phụ</th>
                                            <th>Tiếng Việt</th>
                                            <th>Tiếng Anh</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderSubCategoriesTableData()}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <EditSubCategoryModal isModalOpened={isModalOpened}
                    selectedItem={selectedItem}
                    closeEditCodeModel={this.handleCloseEditModel}
                    listCategory={listCategory} />
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allCodesArr: state.admin.allCodesArr,
        errResponse: state.admin.errResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewSubCategory: (inputData) => dispatch(actions.addNewSubCategory(inputData)),
        fetchAllSubCategory: () => dispatch(actions.fetchAllSubCategory()),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        deleteSubCategory: (inputId) => dispatch(actions.deleteSubCategory(inputId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubCategory);
