import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { CommonUtils, languages } from '../../../../utils'
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
        if (prevProps.errResponse !== this.props.errResponse) {
            this.props.fetchAllCodesByType('category')
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
        await this.props.addNewCode({
            type: this.state.type,
            keyMap: this.state.keyMap,
            valueVI: this.state.valueVI,
            valueEN: this.state.valueEN,
        })
        if (this.props.errResponse.errCode === 0) {
            this.handleClearAllInput();
            this.props.fetchAllCodesByType('category')
        }

    }

    handleDelete = (item) => {
        this.props.deleteCode(item.id);
        if (this.props.errResponse.errCode === 0) {
            this.props.fetchAllCodesByType('category')
        }

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
            type: 'CATEGORY',
            keyMap: '',
            valueVI: '',
            valueEN: '',

            listCategory: [],
            selectedCategory: ''
        })
    }

    handleOnChangeInputValueVI = (event) => {
        let data = event.target.value
        let keyName = CommonUtils.convertToKeyName(data)
        this.setState({
            valueVI: data,
            keyMap: keyName
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
                                <tr key={item.id}>
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
                                // onChange={(event) => this.handleOnChangeInput(event, 'keyMap')} 
                                readOnly />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Tiếng Việt</label>
                            <input className='form-control'
                                value={valueVI}
                                onChange={(event) => this.handleOnChangeInputValueVI(event)} />
                        </div>
                        <div className='col-6 form-group'>
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
        errResponse: state.admin.errResponse
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
