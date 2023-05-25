import actionTypes from './actionTypes';
import {
    createNewUserAPI, addNewCodeAPI, getAllCodesAPI,
    deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    getAllSubCategoryByCategoryTypeAPI, addNewSubCategoryAPI,
    getAllSubCategoryAPI, getAllCodesByIdAPI, getAllChildCategoryAPI
} from '../../services/userService';
import { toast } from 'react-toastify';

// ADMIN LOGIN
export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

// CREATE USER
export const createNewUser = (userData) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await createNewUserAPI(userData);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess(res));
            } else {
                dispatch(createUserFail(res));
            }
        } catch (error) {
            dispatch(createUserFail(res));
            console.log("createNewUser Error: ", error)
        }
    }
}

export const createUserSuccess = (response) => ({
    type: actionTypes.CREATE_NEW_USER_SUCCESS,
    response: response
})

export const createUserFail = (response) => ({
    type: actionTypes.CREATE_NEW_USER_FAIL,
    response: response
})

//ADD NEW CODE
export const addNewCode = (codeData) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await addNewCodeAPI(codeData);
            if (res && res.errCode === 0) {
                dispatch(addNewCodeSuccess(res));
            } else {
                dispatch(addNewCodeFail(res));
            }
        } catch (error) {
            dispatch(createUserFail(res));
            console.log("addNewCode Error: ", error)
        }
    }
}

export const addNewCodeSuccess = (response) => ({
    type: actionTypes.ADD_NEW_CODE_SUCCESS,
    response: response
})

export const addNewCodeFail = (response) => ({
    type: actionTypes.ADD_NEW_CODE_FAIL,
    response: response
})

//FETCH ALL CODES
export const fetchAllCodes = () => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllCodesAPI();
            if (res && res.errCode === 0) {
                dispatch(fetchAllCodesSuccess(res.allCodes));
            } else {
                dispatch(fetchAllCodesFail());
            }
        } catch (error) {
            dispatch(fetchAllCodesFail());
            console.log("addNewCode Error: ", error)
        }
    }
}

export const fetchAllCodesSuccess = (allCode) => ({
    type: actionTypes.FETCH_ALL_CODE_SUCCESS,
    allCodeData: allCode
})

export const fetchAllCodesFail = () => ({
    type: actionTypes.FETCH_ALL_CODE_FAIL
})

//FETCH ALL CODES BY TYPE
export const fetchAllCodesByType = (inputType) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getCodeByTypeAPI(inputType);

            if (res && res.errCode === 0) {
                dispatch(fetchAllCodesByTypeSuccess(res.data));
            } else {
                dispatch(fetchAllCodesByTypeFail());
            }
        } catch (error) {
            dispatch(fetchAllCodesByTypeFail());
            console.log("fetchAllCodesByType Error: ", error)
        }
    }
}

export const fetchAllCodesByTypeSuccess = (allCode) => ({
    type: actionTypes.FETCH_ALL_CODE_SUCCESS,
    allCodeData: allCode
})

export const fetchAllCodesByTypeFail = () => ({
    type: actionTypes.FETCH_ALL_CODE_FAIL
})

//FETCH ALL CODES BY ID
export const fetchAllCodesById = (inputType) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getCodeByTypeAPI(inputType);

            if (res && res.errCode === 0) {
                dispatch(fetchAllCodesByIdSuccess(res.data));
            } else {
                dispatch(fetchAllCodesByIdFail());
            }
        } catch (error) {
            dispatch(fetchAllCodesByIdFail());
            console.log("fetchAllCodesByType Error: ", error)
        }
    }
}

export const fetchAllCodesByIdSuccess = (allCode) => ({
    type: actionTypes.FETCH_ALL_CODE_BY_ID_SUCCESS,
    allCodeData: allCode
})

export const fetchAllCodesByIdFail = () => ({
    type: actionTypes.FETCH_ALL_CODE_BY_ID_FAIL
})

// DELETE CODE
export const deleteCode = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCodeAPI(inputId);

            if (res && res.errCode === 0) {
                dispatch(deleteCodeSuccess());
                dispatch(fetchAllCodes());
            } else {
                dispatch(fetchAllCodesFail());
            }
        } catch (error) {
            dispatch(deleteCodeFail());
            console.log("deleteCode Error: ", error);
        }
    }
}

export const deleteCodeSuccess = () => ({
    type: actionTypes.DELETE_CODE_SUCCESS,
})

export const deleteCodeFail = () => ({
    type: actionTypes.DELETE_CODE_FAIL
})

//UPDATE CODE
export const updateCode = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await editCodeAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(updateCodeSuccess(res));
                dispatch(fetchAllCodes());
            } else {
                dispatch(updateCodeFail(res));
            }
        } catch (error) {
            dispatch(updateCodeFail(res));
            console.log("updateCode Error: ", error);
        }
    }
}

export const updateCodeSuccess = (response) => ({
    type: actionTypes.UPDATE_CODE_SUCCESS,
    response: response
})

export const updateCodeFail = (response) => ({
    type: actionTypes.UPDATE_CODE_FAIL,
    response: response
})

//FETCH ALL SUB CATEGORY
export const fetchAllSubCategory = () => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllSubCategoryAPI();

            if (res && res.errCode === 0) {
                dispatch(fetchAllSubCategorySuccess(res.data));
            } else {
                dispatch(fetchAllSubCategoryFail());
            }
        } catch (error) {
            dispatch(fetchAllSubCategoryFail());
            console.log("fetchAllSubCategory Error: ", error)
        }
    }
}

export const fetchAllSubCategorySuccess = (allSubCategory) => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_SUCCESS,
    allSubCategoryData: allSubCategory
})

export const fetchAllSubCategoryFail = () => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_FAIL
})

//FETCH ALL SUB CATEGORY BY TYPE
export const fetchAllSubCategoryByCategoryType = (categoryType) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllSubCategoryByCategoryTypeAPI(categoryType);
            if (res && res.errCode === 0) {
                dispatch(fetchAllSubCategoryByTypeSuccess(res.data));
            } else {
                dispatch(fetchAllSubCategoryByCategoryTypeFail());
            }
        } catch (error) {
            dispatch(fetchAllSubCategoryByCategoryTypeFail());
            console.log("fetchAllSubCategoryByCategoryType Error: ", error)
        }
    }
}

export const fetchAllSubCategoryByTypeSuccess = (allSubCategory) => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_BY_TYPE_SUCCESS,
    allSubCategoryByTypeData: allSubCategory
})

export const fetchAllSubCategoryByCategoryTypeFail = () => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_BY_TYPE_FAIL
})

//ADD NEW SUB CATEGORY
export const addNewSubCategory = (codeData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await addNewSubCategoryAPI(codeData);
            if (res && res.errCode === 0) {
                dispatch(addNewSubCategorySuccess(res));
            } else {
                dispatch(addNewSubCategoryFail(res));
            }
        } catch (error) {
            dispatch(addNewSubCategoryFail(res));
            console.log("addNewSubCategory Error: ", error)
        }
    }
}

export const addNewSubCategorySuccess = (response) => ({
    type: actionTypes.ADD_NEW_SUB_CATEGORY_SUCCESS,
    response: response
})

export const addNewSubCategoryFail = (response) => ({
    type: actionTypes.ADD_NEW_SUB_CATEGORY_SUCCESS,
    response: response
})

//FETCH ALL CHILD CATEGORY BY ID
export const fetchAllChildCategoryById = (inputSubCatId) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllChildCategoryAPI(inputSubCatId);

            if (res && res.errCode === 0) {
                dispatch(fetchAllChildCategoryByIdSuccess(res.data));
            } else {
                dispatch(fetchAllChildCategoryByIdFail());
            }
        } catch (error) {
            dispatch(fetchAllChildCategoryByIdFail());
            console.log("fetchAllCodesByType Error: ", error)
        }
    }
}

export const fetchAllChildCategoryByIdSuccess = (childCatData) => ({
    type: actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_ID_SUCCESS,
    allChildCatData: childCatData
})

export const fetchAllChildCategoryByIdFail = () => ({
    type: actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_ID_FAIL
})