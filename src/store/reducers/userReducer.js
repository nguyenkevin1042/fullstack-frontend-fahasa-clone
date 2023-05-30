import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    signInMessage: '',
    signInErrCode: ''
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