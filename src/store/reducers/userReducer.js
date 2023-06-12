import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    actionResponse: '',
    product: '',
    cartData: '',

}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.response.user,
                actionResponse: action.response
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                userInfo: null,
                actionResponse: action.response
            }

        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                actionResponse: action.response
            }
        case actionTypes.UPDATE_USER_FAIL:
            return {
                ...state,
                actionResponse: action.response
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

        case actionTypes.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                actionResponse: action.response
            }
        case actionTypes.ADD_TO_CART_FAIL:
            return {
                ...state,
                actionResponse: action.response
            }

        case actionTypes.UPDATE_CART_SUCCESS:
            return {
                ...state,
                actionResponse: action.response
            }
        case actionTypes.UPDATE_CART_FAIL:
            return {
                ...state,
                actionResponse: action.response
            }

        case actionTypes.GET_CART_BY_USER_ID_SUCCESS:
            return {
                ...state,
                cartData: action.response.data.CartProducts
            }
        case actionTypes.GET_CART_BY_USER_ID_FAIL:
            return {
                ...state,
                cartData: ''
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