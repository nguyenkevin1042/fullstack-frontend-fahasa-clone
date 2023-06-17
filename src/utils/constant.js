export const path = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    HOMEPAGE: '/home',
    CUSTOMER_LOGIN: '/customer/account/login',
    CUSTOMER_ACCOUNT: '/customer/account',
    PRODUCT_LIST: '/category/:category?/:subCategory?/:childCategory?',
    PRODUCT_DETAIL: '/product/:keyName',
    // SEARCH_RESULT: '/search-result/:query?',
    SEARCH_RESULT: '/search-result',
    CART: '/cart',
    ONE_STEP_CHECKOUT: '/onestepcheckout',
    ORDER_COMPLETED: '/make-order-success',
    PRODUCT_TAG: '/:tagKeyName?',
};

export const languages = {
    VI: 'vi',
    EN: 'en'
};

export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}