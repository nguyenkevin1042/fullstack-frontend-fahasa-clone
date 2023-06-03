import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    signInMessage: '',
    signInErrCode: '',
    product: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.response.user,
                signInErrCode: action.response.errCode
            }
        case actionTypes.USER_LOGIN_FAIL:
            state.signInMessage = action.response.message
            return {
                ...state,
                userInfo: null,
                signInErrCode: action.response.errCode
            }

        case actionTypes.FETCH_PRODUCT_BY_KEY_NAME_SUCCESS:
            state.product = action.prouductData;
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCT_BY_KEY_NAME_FAIL:

            return {
                ...state,
            }

        case actionTypes.USER_PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }

        default:
            return state;
    }
}

export default appReducer;