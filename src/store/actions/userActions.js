import actionTypes from './actionTypes';
import { addToCartAPI, customerLoginAPI, deleteProductInCartAPI, getCartByUserIdAPI, getProductByKeyNameAPI, updateUserAPI } from '../../services/userService';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLogin = (inputEmail, inputPassword) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await customerLoginAPI(inputEmail, inputPassword);

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
    type: actionTypes.USER_LOGIN_SUCCESS,
    response: response
})

export const updateUserFail = (response) => ({
    type: actionTypes.USER_LOGIN_FAIL,
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
export const deleteProductInCart = (inputCartId, inputProductId) => {
    return async (dispatch, getState) => {
        let res;
        try {
            res = await deleteProductInCartAPI(inputCartId, inputProductId);

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

