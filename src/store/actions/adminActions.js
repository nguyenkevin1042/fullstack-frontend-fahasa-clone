import actionTypes from './actionTypes';

import {
    createNewUserAPI, addNewCodeAPI, getAllCodesAPI, adminLoginAPI,
    deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    getAllSubCategoryByCategoryTypeAPI, addNewSubCategoryAPI, deleteSubCategoryAPI,
    getAllSubCategoryAPI, getAllCodesByIdAPI,
    getAllChildCategorybySubCatIdAPI, addNewChildCategoryAPI, getAllChildCategoryAPI, deleteChildCategoryAPI,
    addNewProductAPI, getAllProductAPI

} from '../../services/userService';
import { toast } from 'react-toastify';
import { Toast } from 'reactstrap';

// ADMIN LOGIN
export const adminLogin = (inputEmail, inputPassword) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await adminLoginAPI(inputEmail, inputPassword);
            if (res && res.errCode === 0) {
                dispatch(adminLoginSuccess(res.user));
            } else {
                dispatch(adminLoginFail(res));
            }
        } catch (error) {
            dispatch(adminLoginFail(res));
            console.log("adminLogin Error: ", error)
        }
    }
}
export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = (response) => ({
    type: actionTypes.ADMIN_LOGIN_FAIL,
    response: response
})

export const adminProcessLogout = () => ({
    type: actionTypes.ADMIN_PROCESS_LOGOUT
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
                // toast.success(res.message)
                dispatch(addNewCodeSuccess(res));
            } else {
                toast.error(res.message)
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
                toast.success(res.message)
                dispatch(updateCodeSuccess(res));
            } else {
                toast.error(res.message)
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
            // console.log(res)
            // return;

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
export const addNewSubCategory = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await addNewSubCategoryAPI(inputData);
            if (res && res.errCode === 0) {
                dispatch(addNewSubCategorySuccess(res));
                toast.success(res.message)
            } else {
                dispatch(addNewSubCategoryFail(res));
                toast.error(res.message)
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

//DELETE SUB CATEGORY
export const deleteSubCategory = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSubCategoryAPI(inputId);

            if (res && res.errCode === 0) {
                toast.success(res.message)
                dispatch(deleteSubCategorySuccess());
                dispatch(fetchAllSubCategory());
            } else {
                toast.error(res.message)
                dispatch(deleteSubCategoryFail());

            }
        } catch (error) {
            dispatch(deleteSubCategoryFail());
            console.log("deleteSubCategory Error: ", error);
        }
    }
}

export const deleteSubCategorySuccess = () => ({
    type: actionTypes.DELETE_SUB_CATEGORY_SUCCESS,
})

export const deleteSubCategoryFail = () => ({
    type: actionTypes.DELETE_SUB_CATEGORY_FAIL
})

//FETCH ALL CHILD CATEGORY
export const fetchAllChildCategory = () => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllChildCategoryAPI();

            if (res && res.errCode === 0) {
                dispatch(fetchAllChildCategorySuccess(res.data));
            } else {
                dispatch(fetchAllChildCategoryFail());
            }
        } catch (error) {
            dispatch(fetchAllChildCategoryFail());
            console.log("fetchAllChildCategory Error: ", error)
        }
    }
}

export const fetchAllChildCategorySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CHILD_CATEGORY_SUCCESS,
    data: data
})

export const fetchAllChildCategoryFail = () => ({
    type: actionTypes.FETCH_ALL_CHILD_CATEGORY_FAIL
})

//FETCH ALL CHILD CATEGORY BY ID
export const fetchAllChildCategoryById = (inputSubCatId) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllChildCategorybySubCatIdAPI(inputSubCatId);

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


//ADD NEW CHILD CATEGORY
export const addNewChildCategory = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await addNewChildCategoryAPI(inputData);
            if (res && res.errCode === 0) {
                dispatch(addNewChildCategorySuccess(res));
                toast.success(res.message)
            } else {
                dispatch(addNewChildCategorySuccess(res));
                toast.error(res.message)
            }
        } catch (error) {
            dispatch(addNewChildCategorySuccess(res));
            console.log("addNewChildCategory Error: ", error)
        }
    }
}

export const addNewChildCategorySuccess = (response) => ({
    type: actionTypes.ADD_NEW_CHILD_CATEGORY_SUCCESS,
    response: response
})

export const addNewChildCategoryFail = (response) => ({
    type: actionTypes.ADD_NEW_CODE_SUCCESS,
    response: response
})

//DELETE SUB CATEGORY
export const deleteChildCategory = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteChildCategoryAPI(inputId);

            if (res && res.errCode === 0) {
                toast.success(res.message)
                dispatch(deleteChildCategorySuccess());
                dispatch(fetchAllChildCategory());
            } else {
                toast.error(res.message)
                dispatch(deleteChildCategoryFail());

            }
        } catch (error) {
            dispatch(deleteChildCategoryFail());
            console.log("deleteChildCategory Error: ", error);
        }
    }
}

export const deleteChildCategorySuccess = () => ({
    type: actionTypes.DELETE_CHILD_CATEGORY_SUCCESS,
})

export const deleteChildCategoryFail = () => ({
    type: actionTypes.DELETE_CHILD_CATEGORY_FAIL
})

//ADD NEW PRODUCT
export const addNewProduct = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            // console.log(inputData)
            // return;
            res = await addNewProductAPI(inputData);
            if (res && res.errCode === 0) {
                dispatch(addNewProductSuccess(res));

            } else {
                dispatch(addNewProductFail(res));

            }
        } catch (error) {
            dispatch(addNewProductFail(res));
            console.log("addNewProduct Error: ", error)
        }
    }
}

export const addNewProductSuccess = (response) => ({
    type: actionTypes.ADD_NEW_PRODUCT_SUCCESS,
    response: response
})

export const addNewProductFail = (response) => ({
    type: actionTypes.ADD_NEW_PRODUCT_FAIL,
    response: response
})

//FETCH ALL PRODUCTS
export const fetchAllProduct = () => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllProductAPI();

            if (res && res.errCode === 0) {
                dispatch(fetchAllProductSuccess(res.allProducts));
            } else {
                dispatch(fetchAllCodesFail());
            }
        } catch (error) {
            dispatch(fetchAllProductFail());
            console.log("fetchAllProduct Error: ", error)
        }
    }
}

export const fetchAllProductSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
    allProductData: data
})

export const fetchAllProductFail = () => ({
    type: actionTypes.FETCH_ALL_PRODUCT_FAIL
})