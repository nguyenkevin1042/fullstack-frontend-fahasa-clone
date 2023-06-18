import actionTypes from './actionTypes';

import {
    createNewUserAPI, addNewCodeAPI, getAllCodesAPI, adminLoginAPI,
    deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    getAllSubCategoryByCategoryAPI, addNewSubCategoryAPI, deleteSubCategoryAPI,
    getAllSubCategoryAPI,
    getAllChildCategoryBySubCategoryAPI, addNewChildCategoryAPI, getAllChildCategoryAPI, deleteChildCategoryAPI,
    addNewProductAPI, getAllProductAPI, editSubCategoryAPI,
    deleteProductAPI, getChildCategoryByKeyNameAPI,
    updateProductAPI, getAllCodesByKeyMapAPI,
    getProductByCategoryAPI, getAllSubCategoryByKeyNameAPI,
    getProductBySubCategoryAPI,
    getProductByChildCategoryAPI,
    createNewBillAPI,
    getAllBillAPI,
    updateBillStatusAPI,
    getProductByNameAPI,
    updateProductDiscountAPI,
    getTagByTypeAPI,
    getProductByTagKeyNameAPI,
    getAllTagAPI,
    getAllTagWithoutProductAPI,
    createProductTagAPI,
    updateProductTagAPI,
    deleteProductTagAPI

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

//FETCH ALL CODES BY KEYMAP
export const fetchAllCodesByKeyMap = (inputKeyMap) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllCodesByKeyMapAPI(inputKeyMap);

            if (res && res.errCode === 0) {
                dispatch(fetchAllCodesByKeyMapSuccess(res.data));
            } else {
                dispatch(fetchAllCodesByIdFail());
            }
        } catch (error) {
            dispatch(fetchAllCodesByKeyMapFail());
            console.log("fetchAllCodesByKeyMap Error: ", error)
        }
    }
}

export const fetchAllCodesByKeyMapSuccess = (response) => ({
    type: actionTypes.FETCH_ALL_CODE_BY_KEY_MAP_SUCCESS,
    categoryResult: response
})

export const fetchAllCodesByKeyMapFail = () => ({
    type: actionTypes.FETCH_ALL_CODE_BY_KEY_MAP_FAIL
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

//FETCH ALL SUB CATEGORY BY CATEGORY
export const fetchAllSubCategoryByKeyName = (keyName) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllSubCategoryByKeyNameAPI(keyName);

            if (res && res.errCode === 0) {
                dispatch(fetchAllSubCategoryByKeyNameSuccess(res.data));
            } else {
                dispatch(fetchAllSubCategoryByKeyNameFail());
            }
        } catch (error) {
            dispatch(fetchAllSubCategoryByKeyNameFail());
            console.log("fetchAllSubCategoryByKeyName Error: ", error)
        }
    }
}

export const fetchAllSubCategoryByKeyNameSuccess = (response) => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_SUCCESS,
    subCategoryResult: response
})

export const fetchAllSubCategoryByKeyNameFail = () => ({
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_FAIL
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

//FETCH ALL CHILD CATEGORY BY KEY NAME
export const fetchChildCategoryByKeyName = (inputKeyName) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getChildCategoryByKeyNameAPI(inputKeyName);

            if (res && res.errCode === 0) {
                dispatch(fetchChildCategoryByKeyNameSuccess(res.data));
            } else {
                dispatch(fetchChildCategoryByKeyNameFail());
            }
        } catch (error) {
            dispatch(fetchAllChildCategoryBySubCategoryFail());
            console.log("fetchAllCodesByType Error: ", error)
        }
    }
}

export const fetchChildCategoryByKeyNameSuccess = (childCategoryData) => ({
    type: actionTypes.FETCH_CHILD_CATEGORY_BY_KEY_NAME_SUCCESS,
    childCategoryResult: childCategoryData
})

export const fetchChildCategoryByKeyNameFail = () => ({
    type: actionTypes.FETCH_CHILD_CATEGORY_BY_KEY_NAME_FAIL
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
                dispatch(fetchAllProduct())
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
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
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
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const fetchAllProductSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
    allProductData: data
})

export const fetchAllProductFail = () => ({
    type: actionTypes.FETCH_ALL_PRODUCT_FAIL
})

//FETCH ALL PRODUCTS BY CATEGORY
export const fetchAllProductByCategory = (inputCategory) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {

            res = await getProductByCategoryAPI(inputCategory);

            if (res && res.errCode === 0) {
                dispatch(fetchAllProductByCategorySuccess(res));
            } else {
                dispatch(fetchAllProductByCategoryFail(res));
            }
        } catch (error) {
            dispatch(fetchAllProductByCategoryFail(res));
            console.log("fetchAllProductByCategory Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const fetchAllProductByCategorySuccess = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
    response: response
})

export const fetchAllProductByCategoryFail = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_CATEGORY_FAIL,
    response: response
})

//FETCH ALL PRODUCTS BY SUB CATEGORY
export const fetchAllProductBySubCategory = (inputCategory, inputSubCategory) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {
            res = await getProductBySubCategoryAPI(inputCategory, inputSubCategory);

            if (res && res.errCode === 0) {
                dispatch(fetchAllProductBySubCategorySuccess(res));
            } else {
                dispatch(fetchAllProductBySubCategoryFail(res));
            }
        } catch (error) {
            dispatch(fetchAllProductBySubCategoryFail(res));
            console.log("fetchAllProductBySubCategory Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const fetchAllProductBySubCategorySuccess = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_SUB_CATEGORY_SUCCESS,
    response: response
})

export const fetchAllProductBySubCategoryFail = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_SUB_CATEGORY_FAIL,
    response: response
})

//FETCH ALL PRODUCTS BY SUB CATEGORY
export const fetchAllProductByChildCategory = (inputSubCategory, inputChildCategory) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {

            res = await getProductByChildCategoryAPI(inputSubCategory, inputChildCategory);

            if (res && res.errCode === 0) {
                dispatch(fetchAllProductByChildCategorySuccess(res));
            } else {
                dispatch(fetchAllProductByChildCategoryFail(res));
            }
        } catch (error) {
            dispatch(fetchAllProductByChildCategoryFail(res));
            console.log("fetchAllProductBySubCategory Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const fetchAllProductByChildCategorySuccess = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_CHILD_CATEGORY_SUCCESS,
    response: response
})

export const fetchAllProductByChildCategoryFail = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_CHILD_CATEGORY_FAIL,
    response: response
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

//UPDATE PPRODUCT
export const updateProduct = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await updateProductAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(updateProductSuccess(res));
                toast.success(res.message)
            } else {
                dispatch(updateProductFail(res));
                toast.error(res.message)
            }
        } catch (error) {
            dispatch(updateProductFail(res));
            console.log("updateProduct Error: ", error)
        }
    }
}

export const updateProductSuccess = (response) => ({
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    response: response
})

export const updateProductFail = (response) => ({
    type: actionTypes.UPDATE_PRODUCT_FAIL,
    response: response
})

//UPDATE PPRODUCT DISCOUNT
export const updateProductDiscount = (inputData) => {
    return async (dispatch, getState) => {
        // dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {
            res = await updateProductDiscountAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
                dispatch(updateProductDiscountSuccess(res));
                dispatch(fetchAllProduct());
                dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
            } else {
                dispatch(updateProductDiscountFail(res));
            }
        } catch (error) {
            dispatch(updateProductDiscountFail(res));
            console.log("updateProductDiscount Error: ", error)
        }
        // dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const updateProductDiscountSuccess = (response) => ({
    type: actionTypes.UPDATE_PRODUCT_DISCOUNT_SUCCESS,
    response: response
})

export const updateProductDiscountFail = (response) => ({
    type: actionTypes.UPDATE_PRODUCT_DISCOUNT_FAIL,
    response: response
})

//GET PRODUCT BY NAME
export const getProductByName = (inputName) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {

            res = await getProductByNameAPI(inputName);
            if (res && res.errCode === 0) {
                dispatch(getProductByNameSuccess(res));
            } else {
                dispatch(getProductByNameFail(res));
            }
        } catch (error) {
            dispatch(getProductByNameFail(res));
            console.log("getProductByName Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const getProductByNameSuccess = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_NAME_SUCCESS,
    response: response
})

export const getProductByNameFail = (response) => ({
    type: actionTypes.FETCH_PRODUCT_BY_NAME_FAIL,
    response: response
})

//CREATE NEW BILL
export const createNewBill = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await createNewBillAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(createNewBillSuccess(res));
            } else {
                dispatch(createNewBillFail(res));
            }
        } catch (error) {
            dispatch(createNewBillFail(res));
            console.log("createNewBill Error: ", error)
        }
    }
}

export const createNewBillSuccess = (response) => ({
    type: actionTypes.CREATE_NEW_BILL_SUCCESS,
    response: response
})

export const createNewBillFail = (response) => ({
    type: actionTypes.CREATE_NEW_BILL_FAIL,
    response: response
})

//GET ALL BILL
export const getAllBill = () => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getAllBillAPI();

            if (res && res.errCode === 0) {
                dispatch(getAllBillSuccess(res));
            } else {
                dispatch(getAllBillFail(res));
            }
        } catch (error) {
            dispatch(getAllBillFail(res));
            console.log("getAllBill Error: ", error)
        }
    }
}

export const getAllBillSuccess = (response) => ({
    type: actionTypes.GET_ALL_BILL_SUCCESS,
    response: response
})

export const getAllBillFail = (response) => ({
    type: actionTypes.GET_ALL_BILL_FAIL,
    response: response
})

//UPDATE BILL STATUS
export const updateBillStatus = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await updateBillStatusAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(updateBillStatusSuccess(res));
            } else {
                dispatch(updateBillStatusFail(res));
            }
        } catch (error) {
            dispatch(updateBillStatusFail(res));
            console.log("updateBillStatus Error: ", error)
        }
    }
}

export const updateBillStatusSuccess = (response) => ({
    type: actionTypes.UPDATE_BILL_STATUS_SUCCESS,
    response: response
})

export const updateBillStatusFail = (response) => ({
    type: actionTypes.UPDATE_BILL_STATUS_FAIL,
    response: response
})


//GET PRODUCT BY TAG KEY NAME
export const getProductByTagKeyName = (inputKeyName) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {

            res = await getProductByTagKeyNameAPI(inputKeyName);

            if (res && res.errCode === 0) {
                dispatch(getProductByTagKeyNameSuccess(res));
            } else {
                dispatch(getProductByTagKeyNameFail(res));
            }
        } catch (error) {
            dispatch(getProductByTagKeyNameFail(res));
            console.log("getProductByTagKeyName Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const getProductByTagKeyNameSuccess = (response) => ({
    type: actionTypes.GET_PRODUCT_BY_TAG_KEY_NAME_SUCCESS,
    response: response
})

export const getProductByTagKeyNameFail = (response) => ({
    type: actionTypes.GET_PRODUCT_BY_TAG_KEY_NAME_FAIL,
    response: response
})


//GET TAG BY TYPE
export const getTagByType = (inputType) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await getTagByTypeAPI(inputType);

            if (res && res.errCode === 0) {
                dispatch(getTagByTypeSuccess(res));
            } else {
                dispatch(getTagByTypeFail(res));
            }
        } catch (error) {
            dispatch(getTagByTypeFail(res));
            console.log("getTagByTypeError: ", error)
        }
    }
}

export const getTagByTypeSuccess = (response) => ({
    type: actionTypes.GET_TAG_SUCCESS,
    response: response
})

export const getTagByTypeFail = (response) => ({
    type: actionTypes.GET_TAG_FAIL,
    response: response
})

//GET ALL TAG
export const getAllTag = () => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await getAllTagAPI();

            if (res && res.errCode === 0) {
                dispatch(getAllTagSuccess(res));
            } else {
                dispatch(getAllTagFail(res));
            }
        } catch (error) {
            dispatch(getAllTagFail(res));
            console.log("getAllTag: ", error)
        }
    }
}

export const getAllTagSuccess = (response) => ({
    type: actionTypes.GET_ALL_TAG_SUCCESS,
    response: response
})

export const getAllTagFail = (response) => ({
    type: actionTypes.GET_ALL_TAG_FAIL,
    response: response
})

//GET ALL TAG
export const getAllTagWithoutProduct = () => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await getAllTagWithoutProductAPI();

            if (res && res.errCode === 0) {
                dispatch(getAllTagWithoutProductSuccess(res));
            } else {
                dispatch(getAllTagWithoutProductFail(res));
            }
        } catch (error) {
            dispatch(getAllTagWithoutProductFail(res));
            console.log("getAllTagWithoutProduct: ", error)
        }
    }
}

export const getAllTagWithoutProductSuccess = (response) => ({
    type: actionTypes.GET_ALL_TAG_WITHOUT_PRODUCT_SUCCESS,
    response: response
})

export const getAllTagWithoutProductFail = (response) => ({
    type: actionTypes.GET_ALL_TA_WITHOUT_PRODUCTG_FAIL,
    response: response
})

//CREATE PRODUCT TAG
export const createProductTag = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await createProductTagAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(createProductTagSuccess(res));
                dispatch(fetchAllProduct());
            } else {
                dispatch(createProductTagFail(res));
            }
        } catch (error) {
            dispatch(createProductTagFail(res));
            console.log("createProductTag Error: ", error)
        }
    }
}

export const createProductTagSuccess = (response) => ({
    type: actionTypes.CREATE_PRODUCT_TAG_SUCCESS,
    response: response
})

export const createProductTagFail = (response) => ({
    type: actionTypes.CREATE_PRODUCT_TAG_FAIL,
    response: response
})

//UPDATE PRODUCT TAG
export const updateProductTag = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await updateProductTagAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(updateProductTagSuccess(res));
                dispatch(fetchAllProduct());
            } else {
                dispatch(updateProductTagFail(res));
            }
        } catch (error) {
            dispatch(updateProductTagFail(res));
            console.log("updateProductTag Error: ", error)
        }
    }
}

export const updateProductTagSuccess = (response) => ({
    type: actionTypes.UPDATE_PRODUCT_TAG_SUCCESS,
    response: response
})

export const updateProductTagFail = (response) => ({
    type: actionTypes.UPDATE_PRODUCT_TAG_FAIL,
    response: response
})

//DELETE PRODUCT TAG
export const deleteProductTag = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await deleteProductTagAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(deleteProductTagSuccess(res));
                dispatch(fetchAllProduct());
            } else {
                dispatch(deleteProductTagFail(res));
            }
        } catch (error) {
            dispatch(deleteProductTagFail(res));
            console.log("deleteProductTag Error: ", error)
        }
    }
}

export const deleteProductTagSuccess = (response) => ({
    type: actionTypes.DELETE_PRODUCT_TAG_SUCCESS,
    response: response
})

export const deleteProductTagFail = (response) => ({
    type: actionTypes.DELETE_PRODUCT_TAG_FAIL,
    response: response
})