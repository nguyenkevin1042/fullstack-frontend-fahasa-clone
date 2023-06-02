import actionTypes from './actionTypes';

import {
    createNewUserAPI, addNewCodeAPI, getAllCodesAPI, adminLoginAPI,
    deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    getAllSubCategoryByCategoryAPI, addNewSubCategoryAPI, deleteSubCategoryAPI,
    getAllSubCategoryAPI,
    getAllChildCategoryBySubCategoryAPI, addNewChildCategoryAPI, getAllChildCategoryAPI, deleteChildCategoryAPI,
    addNewProductAPI, getAllProductAPI, editSubCategoryAPI, deleteProductAPI

} from '../../services/userService';
import { toast } from 'react-toastify';

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
                toast.success(res.message)
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
    errResponse: response
})

export const addNewCodeFail = (response) => ({
    type: actionTypes.ADD_NEW_CODE_FAIL,
    errResponse: response
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
            console.log(res)

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
                toast.success(res.message)
                dispatch(deleteCodeSuccess(res));
            } else {
                toast.error(res.message)
                dispatch(fetchAllCodesFail(res));
            }
        } catch (error) {
            dispatch(deleteCodeFail());
            console.log("deleteCode Error: ", error);
        }
    }
}

export const deleteCodeSuccess = (response) => ({
    type: actionTypes.DELETE_CODE_SUCCESS,
    errResponse: response
})

export const deleteCodeFail = (response) => ({
    type: actionTypes.DELETE_CODE_FAIL,
    errResponse: response
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

//FETCH ALL SUB CATEGORY BY CATEGORY
export const fetchAllSubCategoryByCategory = (category) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllSubCategoryByCategoryAPI(category);

            if (res && res.errCode === 0) {
                dispatch(fetchAllSubCategoryByCategorySuccess(res.subCategories));
            } else {
                dispatch(fetchAllSubCategoryByCategoryFail());
            }
        } catch (error) {
            dispatch(fetchAllSubCategoryByCategoryFail());
            console.log("fetchAllSubCategoryByCategory Error: ", error)
        }
    }
}

export const fetchAllSubCategoryByCategorySuccess = (response) => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_SUCCESS,
    allSubCategoryData: response
})

export const fetchAllSubCategoryByCategoryFail = () => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_FAIL
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
    errResponse: response
})

export const addNewSubCategoryFail = (response) => ({
    type: actionTypes.ADD_NEW_SUB_CATEGORY_SUCCESS,
    errResponse: response
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

//UPDATE SUB CATEGORY
export const updateSubCategory = (inputData) => {
    return async (dispatch, getState) => {
        let res
        try {
            res = await editSubCategoryAPI(inputData);

            if (res && res.errCode === 0) {
                toast.success(res.message)
                dispatch(updateSubCategorySuccess(res));
            } else {
                toast.error(res.message)
                dispatch(updateSubCategoryFail(res));

            }
        } catch (error) {
            dispatch(updateSubCategoryFail(res));
            console.log("updateSubCategory Error: ", error);
        }
    }
}

export const updateSubCategorySuccess = (response) => ({
    type: actionTypes.UPDATE_SUB_CATEGORY_SUCCESS,
    errResponse: response
})

export const updateSubCategoryFail = (response) => ({
    type: actionTypes.UPDATE_SUB_CATEGORY_FAIL,
    errResponse: response
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

//FETCH ALL CHILD CATEGORY BY SUB CATEGORY
export const fetchAllChildCategoryBySubCategory = (inputSubCat) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllChildCategoryBySubCategoryAPI(inputSubCat);

            if (res && res.errCode === 0) {
                dispatch(fetchAllChildCategoryBySubCategorySuccess(res.data));
            } else {
                dispatch(fetchAllChildCategoryBySubCategoryFail());
            }
        } catch (error) {
            dispatch(fetchAllChildCategoryBySubCategoryFail());
            console.log("fetchAllCodesByType Error: ", error)
        }
    }
}

export const fetchAllChildCategoryBySubCategorySuccess = (childCatData) => ({
    type: actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_SUCCESS,
    allChildCatData: childCatData
})

export const fetchAllChildCategoryBySubCategoryFail = () => ({
    type: actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_FAIL
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
                dispatch(addNewChildCategoryFail(res));
                toast.error(res.message)
            }
        } catch (error) {
            dispatch(addNewChildCategoryFail(res));
            console.log("addNewChildCategory Error: ", error)
        }
    }
}

export const addNewChildCategorySuccess = (response) => ({
    type: actionTypes.ADD_NEW_CHILD_CATEGORY_SUCCESS,
    errResponse: response
})

export const addNewChildCategoryFail = (response) => ({
    type: actionTypes.ADD_NEW_CODE_SUCCESS,
    errResponse: response
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
            res = await addNewProductAPI(inputData);
            if (res && res.errCode === 0) {
                dispatch(addNewProductSuccess(res));
                toast.success(res.message)
            } else {
                dispatch(addNewProductFail(res));
                toast.error(res.message)
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

//DELETE PPRODUCT
export const deleteProduct = (inputId) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await deleteProductAPI(inputId);

            if (res && res.errCode === 0) {
                dispatch(deleteProductSuccess());
                toast.success(res.message)
                dispatch(fetchAllProduct());
            } else {
                dispatch(deleteProductFail());
            }
        } catch (error) {
            dispatch(deleteProductFail());
            console.log("fetchAllProduct Error: ", error)
        }
    }
}

export const deleteProductSuccess = () => ({
    type: actionTypes.DELETE_PRODUCT_SUCCESS,

})

export const deleteProductFail = () => ({
    type: actionTypes.DELETE_PRODUCT_FAIL
})