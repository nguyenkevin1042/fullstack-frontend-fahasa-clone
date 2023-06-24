import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { CommonUtils, languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import Select from 'react-select';
import EditSubCategoryModal from './EditSubCategoryModal';
import AddSubCategoryModal from './Modal/AddSubCategoryModal';

class ManageSubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            listSubCategory: [],
            selectedCategory: '',

            selectedItem: '',
            isModalEditOpened: false,
            isModalAddOpened: false
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


    handleEdit = (item) => {
        this.setState({
            selectedItem: item,
            isModalEditOpened: true
        })
    }

    handleDelete = (item) => {
        this.props.deleteSubCategory(item.id);
    }

    handleCloseEditModel = () => {
        this.setState({
            isModalEditOpened: false
        })
        this.props.fetchAllSubCategory();
    }

    handleCloseAddModel = () => {
        this.setState({
            isModalAddOpened: false
        })
        this.props.fetchAllSubCategory();
    }

    handleOpenAddSubCategoryModal = () => {
        this.setState({
            isModalAddOpened: true
        })
    }

    renderSubCategoriesTableData = () => {
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
        let { listCategory, selectedCategory, isModalEditOpened, selectedItem, isModalAddOpened } = this.state;

        return (
            <React.Fragment>
                <div className='manage-category-container'>
                    <div className='manage-category-title'>
                        Quản lý danh mục phụ
                    </div>

                    <div className='sharing-manage-add'>
                        <button className='btn btn-primary'
                            onClick={() => this.handleOpenAddSubCategoryModal()}>Thêm danh mục phụ</button>
                    </div>


                    <div className='sharing-sort-category row'>
                        {/* <div className='col-6 form-group'> */}
                        {/* <label>Tìm kiếm theo:</label>
                        <Select
                            value={selectedCategory}
                            onChange={this.handleChange}
                            options={listCategory}
                            // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                            name="selectedCategory"
                        /> */}

                        {/* </div> */}
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

                <AddSubCategoryModal isModalAddOpened={isModalAddOpened}
                    closeAddSubCategoryModel={this.handleCloseAddModel} />

                <EditSubCategoryModal isModalEditOpened={isModalEditOpened}
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
