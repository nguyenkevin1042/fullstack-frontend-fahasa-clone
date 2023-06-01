import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    signInMessage: '',
    signUpResponse: [],
    allCodesArr: [],
    updateCodeRes: [],
    allSubCategoryArr: [],
    allChildCategoryArr: [],
    allProductArr: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            state.signInMessage = action.response.message
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        case actionTypes.CREATE_NEW_USER_SUCCESS:
            state.signUpResponse = action.response
            return {
                ...state,
            }
        case actionTypes.CREATE_NEW_USER_FAIL:
            state.signUpResponse = action.response
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CODE_SUCCESS:
            state.allCodesArr = action.allCodeData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_FAIL:
            state.allCodesArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CODE_BY_ID_SUCCESS:
            state.allCodesArr = action.allCodeData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_BY_ID_FAIL:
            state.allCodesArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CODE_BY_TYPE_SUCCESS:
            state.allCodesArr = action.allCodeData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_BY_TYPE_FAIL:
            state.allCodesArr = []
            return {
                ...state,
            }

        case actionTypes.UPDATE_CODE_SUCCESS:
            state.updateCodeRes = action.response
            return {
                ...state,
            }
        case actionTypes.UPDATE_CODE_FAIL:
            state.updateCodeRes = action.response
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SUB_CATEGORY_SUCCESS:
            state.allSubCategoryArr = action.allSubCategoryData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SUB_CATEGORY_FAIL:
            state.allSubCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_TYPE_SUCCESS:
            state.allSubCategoryArr = action.allSubCategoryByTypeData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_TYPE_FAIL:
            state.allSubCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_ID_SUCCESS:
            state.allSubCategoryArr = action.allSubCategoryData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_ID_FAIL:
            state.allSubCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CHILD_CATEGORY_SUCCESS:
            state.allChildCategoryArr = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CHILD_CATEGORY_FAIL:
            state.allChildCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_ID_SUCCESS:
            state.allChildCategoryArr = action.allChildCatData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_ID_FAIL:
            state.allChildCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.ADMIN_PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
            state.allProductArr = action.allProductData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_PRODUCT_FAIL:
            state.allProductArr = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer;