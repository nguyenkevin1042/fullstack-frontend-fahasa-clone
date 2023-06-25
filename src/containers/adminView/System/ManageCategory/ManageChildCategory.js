import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { CommonUtils, languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import Select from 'react-select';

class ManageChildCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategory: '',
            keyName: '',
            valueVI: '',
            valueEN: '',

            listCategory: [],
            selectedCategory: '',

            listSubCategory: [],
            selectedSubCategory: '',

            listChildCategory: [],

        };
    }

    componentDidMount() {
        this.props.fetchAllCodesByType('category')
        this.props.fetchAllChildCategory()
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
            let dataSelect = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSelect
            })
        }

        if (prevProps.allChildCategoryArr !== this.props.allChildCategoryArr) {
            this.setState({
                listChildCategory: this.props.allChildCategoryArr
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
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }

        }

        return result;
    }

    handleChange = (event, key) => {
        let data = event;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleChangeCategory = async (selectedCategory) => {
        this.setState({
            selectedCategory: selectedCategory
        })
        await this.props.fetchAllSubCategoryByCategory(selectedCategory.keyName);
    }

    handleChangeSubCategory = (selectedSubCategory) => {
        this.setState({
            subCategory: selectedSubCategory.keyName,
            selectedSubCategory: selectedSubCategory
        })
    }

    handleSaveNewChildCategory = async () => {
        await this.props.addNewChildCategory({
            subCategory: this.state.subCategory,
            keyName: this.state.keyName,
            valueVI: this.state.valueVI,
            valueEN: this.state.valueEN,
        })
        if (this.props.errResponse.errCode === 0) {
            this.handleClearAllInput();
            this.props.fetchAllCodesByType('category')
            this.props.fetchAllChildCategory()
        }

    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleDelete = async (item) => {
        await this.props.deleteChildCategory(item.id)
    }

    handleClearAllInput = () => {
        this.setState({
            keyName: '',
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

    renderChildCategoriesTableData() {
        let { listChildCategory } = this.state

        return (
            <>
                {listChildCategory && listChildCategory.length > 0 &&
                    listChildCategory.map((item, index) => {
                        return (
                            <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.subCategory}</td>
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
        let { subCategory, keyName, valueVI, valueEN,
            listCategory, selectedCategory, listSubCategory, selectedSubCategory } = this.state;

        return (
            <React.Fragment>
                <div className='manage-category-container'>
                    <div className='manage-category-title'>
                        Quản lý danh mục con
                    </div>

                    <div className='manage-category-add-section row'>
                        <div className='col-6 form-group'>
                            <label>Danh mục chính</label>
                            <Select
                                value={selectedCategory}
                                onChange={this.handleChangeCategory}
                                options={listCategory}
                                // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                name="selectedCategory"
                            />

                        </div>
                        <div className='col-6 form-group'>
                            <label>Danh mục phụ</label>
                            <Select
                                value={selectedSubCategory}
                                onChange={this.handleChangeSubCategory}
                                options={listSubCategory}
                                // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                name="selectedSubCategory"
                            />

                        </div>
                        <div className='col-6 form-group'>
                            <label>Tiếng Việt</label>
                            <input className='form-control'
                                value={valueVI}
                                onChange={(event) => this.handleOnChangeInputValueVI(event)} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Mã danh mục con</label>
                            <input className='form-control'
                                value={keyName}
                                readOnly />
                        </div>
                        <div className='col-6'>
                            <label>Tiếng Anh</label>
                            <input className='form-control'
                                value={valueEN}
                                onChange={(event) => this.handleOnChangeInput(event, 'valueEN')} />
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveNewChildCategory()}>Save</button>
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
                                            <th>Mã danh mục phụ</th>
                                            <th>Mã danh mục con</th>
                                            <th>Tiếng Việt</th>
                                            <th>Tiếng Anh</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderChildCategoriesTableData()}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allChildCategoryArr: state.admin.allChildCategoryArr,
        errResponse: state.admin.errResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewChildCategory: (inputData) => dispatch(actions.addNewChildCategory(inputData)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchAllChildCategory: () => dispatch(actions.fetchAllChildCategory()),
        deleteChildCategory: (inputId) => dispatch(actions.deleteChildCategory(inputId)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChildCategory);
