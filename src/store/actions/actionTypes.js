const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

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

    //SUB CATEGORY
    FETCH_ALL_SUB_CATEGORY_SUCCESS: 'FETCH_ALL_SUB_CATEGORY_SUCCESS',
    FETCH_ALL_SUB_CATEGORY_FAIL: 'FETCH_ALL_SUB_CATEGORY_FAIL',

    FETCH_ALL_SUB_CATEGORY_BY_TYPE_SUCCESS: 'FETCH_ALL_SUB_CATEGORY_BY_TYPE_SUCCESS',
    FETCH_ALL_SUB_CATEGORY_BY_TYPE_FAIL: 'FETCH_ALL_SUB_CATEGORY_BY_TYPE_FAIL',

    ADD_NEW_SUB_CATEGORY_SUCCESS: 'ADD_NEW_SUB_CATEGORY_SUCCESS',
    ADD_NEW_SUB_CATEGORY_FAIL: 'ADD_NEW_SUB_CATEGORY_FAIL',

    DELETE_SUB_CATEGORY_SUCCESS: 'DELETE_SUB_CATEGORY_SUCCESS',
    DELETE_SUB_CATEGORY_FAIL: 'DELETE_SUB_CATEGORY_FAIL',

    //CHILD CATEGORY
    FETCH_ALL_CHILD_CATEGORY_SUCCESS: 'FETCH_ALL_CHILD_CATEGORY_SUCCESS',
    FETCH_ALL_CHILD_CATEGORY_FAIL: 'FETCH_ALL_CHILD_CATEGORY_FAIL',

    FETCH_ALL_CHILD_CATEGORY_BY_ID_SUCCESS: 'FETCH_ALL_CHILD_CATEGORY_BY_ID_SUCCESS',
    FETCH_ALL_CHILD_CATEGORY_BY_ID_FAIL: 'FETCH_ALL_CHILD_CATEGORY_BY_ID_FAIL',

    ADD_NEW_CHILD_CATEGORY_SUCCESS: 'ADD_NEW_CHILD_CATEGORY_SUCCESS',
    ADD_NEW_CHILD_CATEGORY_FAIL: 'ADD_NEW_CHILD_CATEGORY_FAIL',

    DELETE_CHILD_CATEGORY_SUCCESS: 'DELETE_CHILD_CATEGORY_SUCCESS',
    DELETE_CHILD_CATEGORY_FAIL: 'DELETE_CHILD_CATEGORY_FAIL',

    //PRODUCT
    ADD_NEW_PRODUCT_SUCCESS: 'ADD_NEW_PRODUCT_SUCCESS',
    ADD_NEW_PRODUCT_FAIL: 'ADD_NEW_PRODUCT_FAIL',

    FETCH_ALL_PRODUCT_SUCCESS: 'FETCH_ALL_PRODUCT_SUCCESS',
    FETCH_ALL_PRODUCT_FAIL: 'FETCH_ALL_PRODUCT_FAIL',
})

export default actionTypes;