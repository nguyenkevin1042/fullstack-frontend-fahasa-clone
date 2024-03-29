import actionTypes from './actionTypes';
import { addToCartAPI, changePasswordAPI, createNewAddressAPI, createNewBillAPI, createNewReviewAPI, customerLoginAPI, deleteProductInCartAPI, getBillByIdAPI, getBillByUserIdAPI, getCartByUserIdAPI, getProductByKeyNameAPI, getReviewByProductIdAPI, getValidationKeyAPI, updateCartAPI, updateUserAPI } from '../../services/userService';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLogin = (inputEmail, inputPassword) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await customerLoginAPI(inputEmail, inputPassword);
            // console.log(res)
            // return;
            if (res && res.errCode === 0) {
                dispatch(userLoginSuccess(res));
            } else {
                dispatch(userLoginFail(res));
            }
        } catch (error) {
            dispatch(userLoginFail(res));
            console.log("userLogin Error: ", error)
        }
    }
}

export const userLoginSuccess = (response) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    response: response
})

export const userLoginFail = (response) => ({
    type: actionTypes.USER_LOGIN_FAIL,
    response: response
})

export const userProcessLogout = () => ({
    type: actionTypes.USER_PROCESS_LOGOUT
})

//GET PRODUCT BY KEY NAME
export const fetchProductByKeyName = (inputKeyName) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {
            res = await getProductByKeyNameAPI(inputKeyName);

            if (res && res.errCode === 0) {
                dispatch(fetchProductByKeyNameSuccess(res.product));
            } else {
                dispatch(fetchProductByKeyNameFail());
            }
        } catch (error) {
            dispatch(fetchProductByKeyNameFail());
            console.log("fetchAllCodesByType Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });

    }
}

export const fetchProductByKeyNameSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCT_BY_KEY_NAME_SUCCESS,
    prouductData: data
})

export const fetchProductByKeyNameFail = () => ({
    type: actionTypes.FETCH_PRODUCT_BY_KEY_NAME_FAIL
})

//UPDATE USER
export const updateUser = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await updateUserAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess(res));
            } else {
                dispatch(updateUserFail(res));
            }
        } catch (error) {
            dispatch(updateUserFail(res));
            console.log("updateUser Error: ", error)
        }
    }
}

export const updateUserSuccess = (response) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    response: response
})

export const updateUserFail = (response) => ({
    type: actionTypes.UPDATE_USER_FAIL,
    response: response
})

//ADD PRODUCT TO CART
export const addToCart = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await addToCartAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(addToCartSuccess(res));
            } else {
                dispatch(addToCartFail(res));
            }
        } catch (error) {
            dispatch(addToCartFail(res));
            console.log("updateUser Error: ", error)
        }
    }
}

export const addToCartSuccess = (response) => ({
    type: actionTypes.ADD_TO_CART_SUCCESS,
    response: response
})

export const addToCartFail = (response) => ({
    type: actionTypes.ADD_TO_CART_FAIL,
    response: response
})

//DELETE PRODUCT IN CART
export const deleteProductInCart = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await deleteProductInCartAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(deleteProductInCartSuccess(res));
            } else {
                dispatch(deleteProductInCartFail(res));
            }
        } catch (error) {
            dispatch(deleteProductInCartFail(res));
            console.log("updateUser Error: ", error)
        }
    }
}

export const deleteProductInCartSuccess = (response) => ({
    type: actionTypes.DELETE_PRODUCT_IN_CART_SUCCESS,
    response: response
})

export const deleteProductInCartFail = (response) => ({
    type: actionTypes.DELETE_PRODUCT_IN_CART_FAIL,
    response: response
})

//GET CART BY USER ID
export const getCartByUserId = (inputUserId) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {
            res = await getCartByUserIdAPI(inputUserId);

            if (res && res.errCode === 0) {
                dispatch(getCartByUserIdSuccess(res));
            } else {
                dispatch(getCartByUserIdFail(res));
            }
        } catch (error) {
            dispatch(getCartByUserIdFail(res));
            console.log("updateUser Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });
    }
}

export const getCartByUserIdSuccess = (response) => ({
    type: actionTypes.GET_CART_BY_USER_ID_SUCCESS,
    response: response
})

export const getCartByUserIdFail = (response) => ({
    type: actionTypes.GET_CART_BY_USER_ID_FAIL,
    response: response
})

//UPDATE PRODUCT IN CART
export const updateCart = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await updateCartAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(addToCartSuccess(res));
            } else {
                dispatch(addToCartFail(res));
            }
        } catch (error) {
            dispatch(addToCartFail(res));
            console.log("updateUser Error: ", error)
        }
    }
}

export const updateCartSuccess = (response) => ({
    type: actionTypes.UPDATE_CART_SUCCESS,
    response: response
})

export const updateCartFail = (response) => ({
    type: actionTypes.UPDATE_CART_FAIL,
    response: response
})

// CREATE NEW ADDRESS
export const createNewAddress = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await createNewAddressAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(createNewAddressSuccess(res));
            } else {
                dispatch(createNewAddressFail(res));
            }
        } catch (error) {
            dispatch(createNewAddressFail(res));
            console.log("createNewAddress Error: ", error)
        }
    }
}

export const createNewAddressSuccess = (response) => ({
    type: actionTypes.CREATE_NEW_USER_ADDRESS_SUCCESS,
    response: response
})

export const createNewAddressFail = (response) => ({
    type: actionTypes.CREATE_NEW_USER_ADDRESS_FAIL,
    response: response
})

// GET BILLS BY USER ID
export const getBillByUserId = (inputUserId) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await getBillByUserIdAPI(inputUserId);

            if (res && res.errCode === 0) {
                dispatch(getBillByUserIdSuccess(res));
            } else {
                dispatch(getBillByUserIdFail(res));
            }
        } catch (error) {
            dispatch(getBillByUserIdFail(res));
            console.log("getBillByUserId Error: ", error)
        }
    }
}

export const getBillByUserIdSuccess = (response) => ({
    type: actionTypes.GET_BILL_BY_USER_ID_SUCCESS,
    response: response
})

export const getBillByUserIdFail = (response) => ({
    type: actionTypes.GET_BILL_BY_USER_ID_FAIL,
    response: response
})

// GET BILLS BY ID
export const getBillById = (inputId) => {
    return async (dispatch, getState) => {
        let res;
        try {

            res = await getBillByIdAPI(inputId);

            if (res && res.errCode === 0) {
                dispatch(getBillByIdSuccess(res));
            } else {
                dispatch(getBillByIdSuccess(res));
            }
        } catch (error) {
            dispatch(getBillByIdSuccess(res));
            console.log("getBillByUserId Error: ", error)
        }
    }
}

export const getBillByIdSuccess = (response) => ({
    type: actionTypes.GET_BILL_BY_ID_SUCCESS,
    response: response
})

export const getBillByIdFail = (response) => ({
    type: actionTypes.GET_BILL_BY_ID_FAIL,
    response: response
})


export const toOneTimeCheckout = (inputSelectedProducts) => {
    return async (dispatch, getState) => {
        try {
            localStorage.setItem('selectedProducts', JSON.stringify(inputSelectedProducts))

        } catch (error) {
            console.log("toOneTimeCheckout Error: ", error)
        }
    }
}

//CREATE NEW BILL
export const createNewBill = (inputData) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCHING_DATA_FAIL });
        let res;
        try {
            res = await createNewBillAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(createNewBillSuccess(res));
                localStorage.removeItem("selectedProducts");
            } else {
                dispatch(createNewBillFail(res));
            }
        } catch (error) {
            dispatch(createNewBillFail(res));
            console.log("createNewBill Error: ", error)
        }
        dispatch({ type: actionTypes.FETCHING_DATA_SUCCESS });

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

//GET VALIDATION KEY
export const getValidationKey = (inputEmail) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await getValidationKeyAPI(inputEmail);

            if (res && res.errCode === 0) {
                dispatch(getValidationKeySuccess(res));
            } else {
                dispatch(getValidationKeyFail(res));
            }
        } catch (error) {
            dispatch(getValidationKeyFail(res));
            console.log("getValidationKey Error: ", error)
        }
    }
}

export const getValidationKeySuccess = (response) => ({
    type: actionTypes.GET_VALIDATION_KEY_SUCCESS,
    response: response
})

export const getValidationKeyFail = (response) => ({
    type: actionTypes.GET_VALIDATION_KEY_FAIL,
    response: response
})

//CHANGE PASSWORD
export const changePassword = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await changePasswordAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(changePasswordSuccess(res));
            } else {
                dispatch(changePasswordFail(res));
            }
        } catch (error) {
            dispatch(changePasswordFail(res));
            console.log("changePassword Error: ", error)
        }
    }
}

export const changePasswordSuccess = (response) => ({
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    response: response
})

export const changePasswordFail = (response) => ({
    type: actionTypes.CHANGE_PASSWORD_FAIL,
    response: response
})

//CREATE NEW REVIEW
export const createNewReview = (inputData) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await createNewReviewAPI(inputData);

            if (res && res.errCode === 0) {
                dispatch(createNewReviewSuccess(res));
            } else {
                dispatch(createNewReviewFail(res));
            }
        } catch (error) {
            dispatch(createNewReviewFail(res));
            console.log("createNewReview Error: ", error)
        }
    }
}

export const createNewReviewSuccess = (response) => ({
    type: actionTypes.CREATE_NEW_REVIEW_SUCCESS,
    response: response
})

export const createNewReviewFail = (response) => ({
    type: actionTypes.CREATE_NEW_REVIEW_FAIL,
    response: response
})

//CREATE NEW REVIEW
export const getReviewByProductId = (inputProductId) => {
    return async (dispatch, getState) => {
        let res;

        try {
            res = await getReviewByProductIdAPI(inputProductId);

            if (res && res.errCode === 0) {
                dispatch(getReviewByProductIdSuccess(res));
            } else {
                dispatch(getReviewByProductIdFail(res));
            }
        } catch (error) {
            dispatch(getReviewByProductIdFail(res));
            console.log("getReviewByProductId Error: ", error)
        }
    }
}

export const getReviewByProductIdSuccess = (response) => ({
    type: actionTypes.GET_REVIEW_BY_PRODUCT_ID_SUCCESS,
    response: response
})

export const getReviewByProductIdFail = (response) => ({
    type: actionTypes.GET_REVIEW_BY_PRODUCT_ID_FAIL,
    response: response
})
