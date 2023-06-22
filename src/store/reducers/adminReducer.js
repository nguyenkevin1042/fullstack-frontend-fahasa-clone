import actionTypes from '../actions/actionTypes';

const initialState = {
    isFetchingData: false,
    isLoggedIn: false,
    adminInfo: null,
    signInMessage: '',
    signUpResponse: [],
    allCodesArr: [],
    bookLayoutArr: [],
    updateCodeRes: [],
    allSubCategoryArr: [],
    allChildCategoryArr: [],
    allProductArr: [],
    allBillArr: [],
    allTagArr: [],
    allUserArr: [],
    errResponse: '',
    selectedCategory: '',
    subCategory: '',
    childCategory: '',
    actionResponse: '',
    singleProduct: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.response.user
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            state.actionResponse = action.response
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        case actionTypes.FETCHING_DATA_SUCCESS:
            state.isFetchingData = false
            return {
                ...state,
            }
        case actionTypes.FETCHING_DATA_FAIL:
            state.isFetchingData = true
            return {
                ...state,
            }

        case actionTypes.CREATE_NEW_USER_SUCCESS:
            state.actionResponse = action.response
            return {
                ...state,
            }
        case actionTypes.CREATE_NEW_USER_FAIL:
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.ADD_NEW_CODE_SUCCESS:
            state.errResponse = action.errResponse
            return {
                ...state,
            }
        case actionTypes.ADD_NEW_CODE_FAIL:
            state.errResponse = action.errResponse
            return {
                ...state,
            }

        case actionTypes.DELETE_CODE_SUCCESS:
            state.errResponse = action.errResponse
            return {
                ...state,
            }
        case actionTypes.DELETE_CODE_FAIL:
            state.errResponse = action.errResponse
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
            state.bookLayoutArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CODE_BY_KEY_MAP_SUCCESS:
            state.allCodesArr = action.categoryResult
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_BY_KEY_MAP_FAIL:
            state.selectedCategory = ''
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

        case actionTypes.ADD_NEW_SUB_CATEGORY_SUCCESS:
            state.errResponse = action.errResponse
            return {
                ...state,
            }
        case actionTypes.ADD_NEW_SUB_CATEGORY_FAIL:
            state.errResponse = action.errResponse
            return {
                ...state,
            }
        case actionTypes.UPDATE_SUB_CATEGORY_SUCCESS:
            state.errResponse = action.errResponse
            return {
                ...state,
            }

        case actionTypes.UPDATE_SUB_CATEGORY_FAIL:
            state.errResponse = action.errResponse
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

        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_SUCCESS:
            state.allSubCategoryArr = action.allSubCategoryData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_FAIL:
            state.allSubCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_SUCCESS:
            state.subCategory = action.subCategoryResult
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_FAIL:
            state.subCategory = []
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

        case actionTypes.ADD_NEW_CHILD_CATEGORY_SUCCESS:
            state.errResponse = action.errResponse
            return {
                ...state,
            }
        case actionTypes.ADD_NEW_CHILD_CATEGORY_FAIL:
            state.errResponse = action.errResponse
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

        case actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_SUCCESS:
            state.allChildCategoryArr = action.allChildCatData
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_FAIL:
            state.allChildCategoryArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_CHILD_CATEGORY_BY_KEY_NAME_SUCCESS:
            state.childCategory = action.childCategoryResult
            return {
                ...state,
            }
        case actionTypes.FETCH_CHILD_CATEGORY_BY_KEY_NAME_FAIL:
            state.childCategory = []
            return {
                ...state,
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

        case actionTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
            state.actionResponse = action.response
            state.singleProduct = action.response.product
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCT_BY_ID_FAIL:
            state.singleProduct = ''
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.FETCH_PRODUCT_BY_CATEGORY_SUCCESS:
            state.actionResponse = action.response
            state.allProductArr = action.response.allProducts
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCT_BY_CATEGORY_FAIL:
            state.allProductArr = []
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.FETCH_PRODUCT_BY_SUB_CATEGORY_SUCCESS:
            state.actionResponse = action.response
            state.allProductArr = action.response.allProducts
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCT_BY_SUB_CATEGORY_FAIL:
            state.allProductArr = []
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.FETCH_PRODUCT_BY_CHILD_CATEGORY_SUCCESS:
            state.actionResponse = action.response
            state.allProductArr = action.response.allProducts
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCT_BY_CHILD_CATEGORY_FAIL:
            state.allProductArr = []
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.ADD_NEW_PRODUCT_SUCCESS:
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.ADD_NEW_PRODUCT_FAIL:
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            state.actionResponse = ''
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.UPDATE_PRODUCT_FAIL:
            state.actionResponse = ''
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.CREATE_NEW_BILL_SUCCESS:
            return {
                ...state,
                actionResponse: action.response
            }
        case actionTypes.CREATE_NEW_BILL_FAIL:
            return {
                ...state,
                actionResponse: action.response
            }

        case actionTypes.UPDATE_BILL_STATUS_SUCCESS:
            return {
                ...state,
                actionResponse: action.response
            }
        case actionTypes.UPDATE_BILL_STATUS_FAIL:
            return {
                ...state,
                actionResponse: action.response
            }

        case actionTypes.GET_ALL_BILL_SUCCESS:
            return {
                ...state,
                allBillArr: action.response.data
            }
        case actionTypes.GET_ALL_BILL_FAIL:
            return {
                ...state,
                allBillArr: []
            }

        case actionTypes.FETCH_PRODUCT_BY_NAME_SUCCESS:
            state.actionResponse = action.response
            state.allProductArr = action.response.data
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCT_BY_NAME_FAIL:
            state.allProductArr = []
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.UPDATE_PRODUCT_DISCOUNT_SUCCESS:
            state.actionResponse = action.response
            return {
                ...state,
            }
        case actionTypes.UPDATE_PRODUCT_DISCOUNT_FAIL:
            state.actionResponse = action.response
            return {
                ...state,
            }

        case actionTypes.GET_TAG_SUCCESS:
            state.allTagArr = action.response.tags
            return {
                ...state,
            }
        case actionTypes.GET_TAG_FAIL:
            state.allTagArr = []
            return {
                ...state,
            }

        case actionTypes.GET_ALL_TAG_SUCCESS:
            state.allTagArr = action.response.finalTagData
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TAG_FAIL:
            state.allTagArr = []
            return {
                ...state,
            }

        case actionTypes.GET_ALL_TAG_WITHOUT_PRODUCT_SUCCESS:
            state.allTagArr = action.response.tags
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TAG_WITHOUT_PRODUCT_FAIL:
            state.allTagArr = []
            return {
                ...state,
            }

        case actionTypes.GET_PRODUCT_BY_TAG_KEY_NAME_SUCCESS:
            state.allProductArr = action.response.products
            return {
                ...state,
            }
        case actionTypes.GET_PRODUCT_BY_TAG_KEY_NAME_FAIL:
            state.allProductArr = []
            return {
                ...state,
            }

        case actionTypes.GET_ALL_USER_SUCCESS:
            state.allUserArr = action.response.data
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USER_FAIL:
            state.allUserArr = []
            return {
                ...state,
            }


        case actionTypes.ADMIN_PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        default:
            return state;
    }
}

export default appReducer;