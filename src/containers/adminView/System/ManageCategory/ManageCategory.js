import React, { Component, useCallback, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { CommonUtils, languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import EditCategoryModal from './EditCategoryModal';

function ManageCategory(props) {
    const [inputData, setInputData] = useState({
        type: 'CATEGORY',
        keyMap: '',
        valueVI: '',
        valueEN: '',
    })
    const [listCategory, setListCategory] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [isModalOpened, setIsModalOpened] = useState(false)

    // GET CATEGORY LIST
    const fetchData = async () => {
        await props.fetchAllCodesByType('category')
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setListCategory(props.allCodesArr)
    }, [props.allCodesArr])

    // CLEAR ALL INPUT ACTION
    const handleClearAllInput = () => {
        setInputData({
            type: 'CATEGORY',
            keyMap: '',
            valueVI: '',
            valueEN: '',
        })
    }
    //ON CHANGE VI&KEYMAP VALUE
    const handleOnChangeInputValueVI = (event) => {
        let data = event.target.value
        let keyName = CommonUtils.convertToKeyName(data)
        let copyInputData = { ...inputData };
        copyInputData.valueVI = data;
        copyInputData.keyMap = keyName;
        setInputData({ ...copyInputData });
    }
    //ON CHANGE OTHER VALUE
    const handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyInputData = { ...inputData };
        copyInputData[key] = data;
        setInputData({ ...copyInputData });
    }

    //SAVE ACTION
    const handleSaveNewCategory = async (inputData) => {
        await props.addNewCode({
            type: inputData.type,
            keyMap: inputData.keyMap,
            valueVI: inputData.valueVI,
            valueEN: inputData.valueEN,
        })
    }

    //EDIT ACTION
    const handleEdit = (item) => {
        console.log(item)
        setIsModalOpened(true)
        setSelectedItem(item)
    }

    // CLOSE EDIT MODAL
    const handleCloseEditModal = () => {
        setIsModalOpened(false)

    }

    //DELETE ATION
    const handleDelete = async (item) => {
        await props.deleteCode(item.id);
    }

    //CHECK ACTION RESPONSE
    useEffect(() => {
        console.log(props.actionResponse)
        if (props.actionResponse.errCode === 0) {
            handleClearAllInput();
            fetchData()
        }
    }, [props.actionResponse])

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
                            value={inputData.type}
                            readOnly />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Mã danh mục chính</label>
                        <input className='form-control'
                            value={inputData.keyMap}
                            readOnly />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Tiếng Việt</label>
                        <input className='form-control'
                            value={inputData.valueVI}
                            onChange={(event) => handleOnChangeInputValueVI(event)} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Tiếng Anh</label>
                        <input className='form-control'
                            id='valueEN'
                            value={inputData.valueEN}
                            onChange={(event) => handleOnChangeInput(event)} />
                    </div>
                    <div className='col-6'>
                        <button className='btn btn-primary'
                            onClick={() => handleSaveNewCategory(inputData)}>Save</button>
                    </div>
                    <div className='col-6 form-group'>
                        <button className='btn btn-primary'
                            onClick={() => handleClearAllInput()} > Reset</button>
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
                                    {renderCategoriesTableData(listCategory, handleEdit, handleDelete)}
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <EditCategoryModal isModalOpened={isModalOpened}
                selectedItem={selectedItem}
                closeEditCodeModel={handleCloseEditModal} />
        </React.Fragment >
    )
}

function renderCategoriesTableData(listCategory, editFunction, deleteFunction) {
    return (
        <>
            {listCategory && listCategory.length > 0 &&
                listCategory.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.type}</td>
                            <td>{item.keyMap}</td>
                            <td>{item.valueVI}</td>
                            <td>{item.valueEN}</td>
                            <td>
                                <button className='btn-edit'
                                    onClick={() => editFunction(item)}
                                > <i className="fas fa-pencil-alt"></i></button>
                                <button className='btn-delete'
                                    onClick={() => deleteFunction(item)}
                                ><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    )
                })

            }
        </>
    )
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
        addNewCode: (codeData) => dispatch(actions.addNewCode(codeData)),
        deleteCode: (inputId) => dispatch(actions.deleteCode(inputId)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
