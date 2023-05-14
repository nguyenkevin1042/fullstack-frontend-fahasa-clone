import actionTypes from './actionTypes';
import {
    createNewUserAPI, addNewCodeAPI, getAllCodesAPI,
    deleteCodeAPI, editCodeAPI
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
            dispatch(createUserFail());
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

