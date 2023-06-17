const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    FETCHING_DATA_SUCCESS: 'FETCHING_DATA_SUCCESS',
    FETCHING_DATA_FAIL: 'FETCHING_DATA_FAIL',

    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    ADMIN_PROCESS_LOGOUT: 'ADMIN_PROCESS_LOGOUT',

    //USER
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    USER_PROCESS_LOGOUT: 'USER_PROCESS_LOGOUT',

    CREATE_NEW_USER_SUCCESS: 'CREATE_NEW_USER_SUCCESS',
    CREATE_NEW_USER_FAIL: 'CREATE_NEW_USER_FAIL',

    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',

    //USER ADDRESS
    CREATE_NEW_USER_ADDRESS_SUCCESS: 'CREATE_NEW_USER_ADDRESS_SUCCESS',
    CREATE_NEW_USER_ADDRESS_FAIL: 'CREATE_NEW_USER_ADDRESS_FAIL',

    //ALLCODE
    ADD_NEW_CODE_SUCCESS: 'ADD_NEW_CODE_SUCCESS',
    ADD_NEW_CODE_FAIL: 'ADD_NEW_CODE_FAIL',

    FETCH_ALL_CODE_SUCCESS: 'FETCH_ALL_CODE_SUCCESS',
    FETCH_ALL_CODE_FAIL: 'FETCH_ALL_CODE_FAIL',

    DELETE_CODE_SUCCESS: 'DELETE_CODE_SUCCESS',
    DELETE_CODE_FAIL: 'DELETE_CODE_FAIL',

    UPDATE_CODE_SUCCESS: 'UPDATE_CODE_SUCCESS',
    UPDATE_CODE_FAIL: 'UPDATE_CODE_FAIL',

    FETCH_ALL_CODE_BY_TYPE_SUCCESS: 'FETCH_ALL_CODE_BY_TYPE_SUCCESS',
    FETCH_ALL_CODE_BY_TYPE_FAIL: 'FETCH_ALL_CODE_BY_TYPE_FAIL',

    FETCH_ALL_CODE_BY_ID_SUCCESS: 'FETCH_ALL_CODE_BY_ID_SUCCESS',
    FETCH_ALL_CODE_BY_ID_FAIL: 'FETCH_ALL_CODE_BY_ID_FAIL',

    FETCH_ALL_CODE_BY_KEY_MAP_SUCCESS: 'FETCH_ALL_CODE_BY_KEY_MAP_SUCCESS',
    FETCH_ALL_CODE_BY_KEY_MAP_FAIL: 'FETCH_ALL_CODE_BY_KEY_MAP_FAIL',

    //SUB CATEGORY
    FETCH_ALL_SUB_CATEGORY_SUCCESS: 'FETCH_ALL_SUB_CATEGORY_SUCCESS',
    FETCH_ALL_SUB_CATEGORY_FAIL: 'FETCH_ALL_SUB_CATEGORY_FAIL',

    FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_SUCCESS: 'FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_SUCCESS',
    FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_FAIL: 'FETCH_ALL_SUB_CATEGORY_BY_CATEGORY_FAIL',

    FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_SUCCESS: 'FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_SUCCESS',
    FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_FAIL: 'FETCH_ALL_SUB_CATEGORY_BY_KEY_NAME_FAIL',

    ADD_NEW_SUB_CATEGORY_SUCCESS: 'ADD_NEW_SUB_CATEGORY_SUCCESS',
    ADD_NEW_SUB_CATEGORY_FAIL: 'ADD_NEW_SUB_CATEGORY_FAIL',

    DELETE_SUB_CATEGORY_SUCCESS: 'DELETE_SUB_CATEGORY_SUCCESS',
    DELETE_SUB_CATEGORY_FAIL: 'DELETE_SUB_CATEGORY_FAIL',

    UPDATE_SUB_CATEGORY_SUCCESS: 'UPDATE_SUB_CATEGORY_SUCCESS',
    UPDATE_SUB_CATEGORY_FAIL: 'UPDATE_SUB_CATEGORY_FAIL',

    //CHILD CATEGORY
    FETCH_ALL_CHILD_CATEGORY_SUCCESS: 'FETCH_ALL_CHILD_CATEGORY_SUCCESS',
    FETCH_ALL_CHILD_CATEGORY_FAIL: 'FETCH_ALL_CHILD_CATEGORY_FAIL',

    FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_SUCCESS: 'FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_SUCCESS',
    FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_FAIL: 'FETCH_ALL_CHILD_CATEGORY_BY_SUB_CATEGORY_FAIL',

    FETCH_CHILD_CATEGORY_BY_KEY_NAME_SUCCESS: 'FETCH_CHILD_CATEGORY_BY_KEY_NAME_SUCCESS',
    FETCH_CHILD_CATEGORY_BY_KEY_NAME_FAIL: 'FETCH_CHILD_CATEGORY_BY_KEY_NAME_FAIL',

    ADD_NEW_CHILD_CATEGORY_SUCCESS: 'ADD_NEW_CHILD_CATEGORY_SUCCESS',
    ADD_NEW_CHILD_CATEGORY_FAIL: 'ADD_NEW_CHILD_CATEGORY_FAIL',

    DELETE_CHILD_CATEGORY_SUCCESS: 'DELETE_CHILD_CATEGORY_SUCCESS',
    DELETE_CHILD_CATEGORY_FAIL: 'DELETE_CHILD_CATEGORY_FAIL',

    //PRODUCT
    ADD_NEW_PRODUCT_SUCCESS: 'ADD_NEW_PRODUCT_SUCCESS',
    ADD_NEW_PRODUCT_FAIL: 'ADD_NEW_PRODUCT_FAIL',

    FETCH_ALL_PRODUCT_SUCCESS: 'FETCH_ALL_PRODUCT_SUCCESS',
    FETCH_ALL_PRODUCT_FAIL: 'FETCH_ALL_PRODUCT_FAIL',

    FETCH_PRODUCT_BY_KEY_NAME_SUCCESS: 'FETCH_PRODUCT_BY_KEY_NAME_SUCCESS',
    FETCH_PRODUCT_BY_KEY_NAME_FAIL: 'FETCH_PRODUCT_BY_KEY_NAME_FAIL',

    FETCH_PRODUCT_BY_CATEGORY_SUCCESS: 'FETCH_PRODUCT_BY_CATEGORY_SUCCESS',
    FETCH_PRODUCT_BY_CATEGORY_FAIL: 'FETCH_PRODUCT_BY_CATEGORY_FAIL',

    FETCH_PRODUCT_BY_SUB_CATEGORY_SUCCESS: 'FETCH_PRODUCT_BY_SUB_CATEGORY_SUCCESS',
    FETCH_PRODUCT_BY_SUB_CATEGORY_FAIL: 'FETCH_PRODUCT_BY_SUB_CATEGORY_FAIL',

    FETCH_PRODUCT_BY_CHILD_CATEGORY_SUCCESS: 'FETCH_PRODUCT_BY_CHILD_CATEGORY_SUCCESS',
    FETCH_PRODUCT_BY_CHILD_CATEGORY_FAIL: 'FETCH_PRODUCT_BY_CHILD_CATEGORY_FAIL',

    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAIL: 'DELETE_PRODUCT_FAIL',

    UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
    UPDATE_PRODUCT_FAIL: 'UPDATE_PRODUCT_FAIL',

    UPDATE_PRODUCT_DISCOUNT_SUCCESS: 'UPDATE_PRODUCT_DISCOUNT_SUCCESS',
    UPDATE_PRODUCT_DISCOUNT_FAIL: 'UPDATE_PRODUCT_DISCOUNT_FAIL',

    FETCH_PRODUCT_BY_NAME_SUCCESS: 'FETCH_PRODUCT_BY_NAME_SUCCESS',
    FETCH_PRODUCT_BY_NAME_FAIL: 'FETCH_PRODUCT_BY_NAME_FAIL',

    //CART
    GET_CART_BY_USER_ID_SUCCESS: 'GET_CART_BY_USER_ID_SUCCESS',
    GET_CART_BY_USER_ID_FAIL: 'GET_CART_BY_USER_ID_FAIL',

    //CART PRODUCT
    ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
    ADD_TO_CART_FAIL: 'ADD_TO_CART_FAIL',

    UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
    UPDATE_CART_FAIL: 'UPDATE_CART_FAIL',

    DELETE_PRODUCT_IN_CART_SUCCESS: 'DELETE_PRODUCT_IN_CART_SUCCESS',
    DELETE_PRODUCT_IN_CART_FAIL: 'DELETE_PRODUCT_IN_CART_FAIL',

    //BILL
    CREATE_NEW_BILL_SUCCESS: 'CREATE_NEW_BILL_SUCCESS',
    CREATE_NEW_BILL_FAIL: 'CREATE_NEW_BILL_FAIL',

    GET_BILL_BY_USER_ID_SUCCESS: 'GET_BILL_BY_USER_ID_SUCCESS',
    GET_BILL_BY_USER_ID_FAIL: 'GET_BILL_BY_USER_ID_FAIL',

    GET_ALL_BILL_SUCCESS: 'GET_ALL_BILL_SUCCESS',
    GET_ALL_BILL_FAIL: 'GET_ALL_BILL_FAIL',

    UPDATE_BILL_STATUS_SUCCESS: 'UPDATE_BILL_STATUS_SUCCESS',
    UPDATE_BILL_STATUS_FAIL: 'UPDATE_BILL_STATUS_FAIL',

    //TAG
    GET_PRODUCT_BY_TAG_KEY_NAME_SUCCESS: 'GET_PRODUCT_BY_TAG_KEY_NAME_SUCCESS',
    GET_PRODUCT_BY_TAG_KEY_NAME_FAIL: 'GET_PRODUCT_BY_TAG_KEY_NAME_FAIL',

    GET_TAG_SUCCESS: 'GET_TAG_SUCCESS',
    GET_TAG_FAIL: 'GET_TAG_FAIL',
})

export default actionTypes;