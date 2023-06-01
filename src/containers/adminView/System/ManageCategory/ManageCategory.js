import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import EditCategoryModal from './EditCategoryModal';

class ManageCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'CATEGORY',
            keyMap: '',
            valueVI: '',
            valueEN: '',
            listCategory: [],
            selectedItem: {},
            isModalOpened: false
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
                listCategory: this.props.allCodesArr
            })
        }


    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVI = item.valueVI;
                let labelEN = item.valueEN;

                obj.key = item.id;
                obj.label = language === languages.VI ? labelVI : labelEN;
                result.push(obj);
            });
        }

        return result;
    }



    handleSaveNewCategory = async () => {
        let keyName = this.handleConvertToKeyName(this.state.valueVI)
        // let keyName = this.handleConvertToNonAccentVietnamese(this.state.valueVI)
        console.log(keyName)
        // await this.props.addNewCode(this.state)
        // this.handleClearAllInput();
        // this.props.fetchAllCodesByType('category')
    }

    handleConvertToKeyName = (inputName) => {
        inputName = this.handleConvertToNonAccentVietnamese(inputName)
        inputName = inputName.split(' ').join('-');
        inputName = inputName.toLowerCase();
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

    handleDelete = (item) => {
        this.props.deleteCode(item.id);
    }

    handleEdit = (item) => {
        this.setState({
            selectedItem: item,
            isModalOpened: true
        })
    }
    handleCloseEditModel = () => {
        this.setState({
            isModalOpened: false
        })
        this.props.fetchAllCodesByType('category')
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleClearAllInput = () => {
        this.setState({
            categoryId: '',
            type: '',
            valueVI: '',
            valueEN: '',

            listCategory: [],
            selectedCategory: ''
        })
    }

    renderCategoriesTableData() {
        let { listCategory } = this.state
        return (
            <>
                {listCategory && listCategory.length > 0 &&
                    listCategory.map((item, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.type}</td>
                                    <td>{item.keyMap}</td>
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
        let { type, keyMap, valueVI, valueEN, isModalOpened, selectedItem } = this.state;
        let { allCodesArr } = this.props



        return (
            <React.Fragment>
                <div className='manage-category-container'>
                    <div className='manage-category-title'>
                        Quản lý danh mục chính
                    </div>

                    <div className='manage-category-add-section row'>
                        <div className='col-6 form-group'>
                            <label>Loại</label>
                            <input className='form-control'
                                value={type}
                                readOnly />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Mã danh mục chính</label>
                            <input className='form-control'
                                value={keyMap}
                                onChange={(event) => this.handleOnChangeInput(event, 'keyMap')} />
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
                                onClick={() => this.handleSaveNewCategory()}>Save</button>
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
                                            <th>Loại</th>
                                            <th>Mã danh mục</th>
                                            <th>Tiếng Việt</th>
                                            <th>Tiếng Anh</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderCategoriesTableData()}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <EditCategoryModal isModalOpened={isModalOpened}
                    selectedItem={selectedItem}
                    closeEditCodeModel={this.handleCloseEditModel} />
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewCode: (codeData) => dispatch(actions.addNewCode(codeData)),

        deleteCode: (inputId) => dispatch(actions.deleteCode(inputId)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
