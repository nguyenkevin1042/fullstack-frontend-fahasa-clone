import axios from "../axios";

//USER
const getAllUserAPI = () => {
    return axios.get("/api/get-all-users");
}

const createNewUserAPI = (data) => {
    return axios.post("/api/create-new-user", data);
}

const updateUserAPI = (data) => {
    return axios.post("/api/update-user", data);
}

const changePasswordAPI = (data) => {
    return axios.post("/api/change-password", data);
}

const adminLoginAPI = (inputEmail, inputPassword) => {
    return axios.post("/api/admin/login", {
        email: inputEmail,
        password: inputPassword
    });
}

const customerLoginAPI = (inputEmail, inputPassword) => {
    return axios.post("/api/customer/login", {
        email: inputEmail,
        password: inputPassword
    });
}

const getValidationKeyAPI = (inputEmail) => {
    return axios.post("/api/get-validation-key", {
        email: inputEmail
    });
}

//ALL CODES
const addNewCodeAPI = (data) => {
    return axios.post("/api/add-new-code", data);
}

const getAllCodesAPI = () => {
    return axios.get("/api/get-all-codes");
}

const getAllCodesByIdAPI = (inputId) => {
    return axios.get("/api/get-code-by-id", {
        params: {
            id: inputId
        }
    });
}

const getAllCodesByKeyMapAPI = (inputKeyMap) => {
    return axios.get("/api/get-code-by-key-map", {
        params: {
            keyMap: inputKeyMap
        }
    });
}

const deleteCodeAPI = (inputId) => {
    return axios.delete("/api/delete-code", {
        params: {
            id: inputId
        }
    });
}

const editCodeAPI = (inputData) => {
    return axios.put("/api/edit-code", inputData);
}

const getCodeByTypeAPI = (inputType) => {
    return axios.get("/api/get-code-by-type", {
        params: {
            type: inputType
        }
    });
}

//SUB CATEGORY
const getAllSubCategoryAPI = () => {
    return axios.get("/api/get-all-sub-category");
}

const getAllSubCategoryByCategoryAPI = (inputCategory) => {
    return axios.get("/api/get-all-sub-category-by-category",
        { params: { category: inputCategory } });
}

const getAllSubCategoryByKeyNameAPI = (inputKeyName) => {
    return axios.get("/api/get-all-sub-category-by-key-name",
        { params: { keyName: inputKeyName } });
}

const addNewSubCategoryAPI = (data) => {
    return axios.post("/api/add-new-sub-category", data);
}

const deleteSubCategoryAPI = (inputId) => {
    return axios.delete("/api/delete-sub-category",
        { params: { id: inputId } }
    );
}

const editSubCategoryAPI = (inputData) => {
    return axios.put("/api/edit-sub-category", inputData);
}

//CHILD CATEGORY
const getAllChildCategoryBySubCategoryAPI = (inputSubCategory) => {
    return axios.get("/api/get-all-child-category-by-sub-category",
        { params: { subCategory: inputSubCategory } });
}

const getChildCategoryByKeyNameAPI = (inputKeyName) => {
    return axios.get("/api/get-child-category-by-key-name",
        { params: { keyName: inputKeyName } });
}

const addNewChildCategoryAPI = (data) => {
    return axios.post("/api/add-new-child-category", data);
}

const getAllChildCategoryAPI = () => {
    return axios.get("/api/get-all-child-category");
}

const deleteChildCategoryAPI = (inputId) => {
    return axios.delete("/api/delete-child-category",
        { params: { id: inputId } }
    );
}

//PRODUCT
const addNewProductAPI = (data) => {
    return axios.post("/api/add-new-product", data);
}

const updateProductAPI = (data) => {
    return axios.post("/api/update-product", data);
}

const updateProductDiscountAPI = (data) => {
    return axios.post("/api/update-product-discount", data);
}

const getAllProductAPI = () => {
    return axios.get("/api/get-all-product");
}


const getProductByIdAPI = (inputId) => {
    return axios.get("/api/get-product-by-id",
        { params: { id: inputId } });
}

const getProductByKeyNameAPI = (inputKeyName) => {
    return axios.get("/api/get-product-by-key-name",
        { params: { keyName: inputKeyName } });
}

const getProductByCategoryAPI = (inputCategory) => {
    return axios.get("/api/get-all-product-by-category",
        { params: { category: inputCategory } });
}

const getProductBySubCategoryAPI = (inputCategory, inputSubCategory) => {
    return axios.get("/api/get-all-product-by-sub-category",
        {
            params: {
                category: inputCategory,
                subCategory: inputSubCategory
            }
        });
}

const getProductByChildCategoryAPI = (inputSubCategory, inputChildCategory) => {
    return axios.get("/api/get-all-product-by-child-category",
        {
            params: {
                subCategory: inputSubCategory,
                childCategory: inputChildCategory
            }
        });
}

const deleteProductAPI = (inputId) => {
    return axios.delete("/api/delete-product",
        { params: { id: inputId } }
    );
}

const getProductByNameAPI = (inputName) => {
    return axios.get("/api/get-product-by-name",
        { params: { name: inputName } }
    );
}

//CART
const getCartByUserIdAPI = (inputUserId) => {
    return axios.get("/api/get-cart-by-user-id",
        {
            params: {
                userId: inputUserId
            }
        });
}

//CART PRODUCT
const addToCartAPI = (data) => {
    return axios.post("/api/add-to-cart", data);
}

const deleteProductInCartAPI = (data) => {
    return axios.delete("/api/delete-product-in-cart",
        {
            params: {
                userId: data.userId,
                cartId: data.cartId,
                productId: data.productId
            }
        });
}

const updateCartAPI = (data) => {
    return axios.post("/api/update-cart", data);
}

//USER ADDRESS
const createNewAddressAPI = (data) => {
    return axios.post("/api/create-new-address", data);
}

//BILL
const createNewBillAPI = (data) => {
    return axios.post("/api/create-new-bill", data);
}

const updateBillStatusAPI = (data) => {
    return axios.post("/api/update-bill-status", data);
}

const getBillByUserIdAPI = (inputUserId) => {
    return axios.get("/api/get-bill-by-user-id",
        {
            params: {
                userId: inputUserId
            }
        });
}

const getBillByIdAPI = (inputId) => {
    return axios.get("/api/get-bill-by-id",
        { params: { id: inputId } });
}

const getAllBillAPI = () => {
    return axios.get("/api/get-all-bill");
}

//TAG
const getProductByTagKeyNameAPI = (inputKeyName) => {
    return axios.get("/api/get-product-by-tag-key-name",
        { params: { keyName: inputKeyName } });
}

const getProductByTagIdAPI = (inputTagId) => {
    return axios.get("/api/get-product-by-tag-id",
        { params: { tagId: inputTagId } });
}

const getTagByTypeAPI = (inputType) => {
    return axios.get("/api/get-tag-by-type",
        { params: { type: inputType } });
}

const getAllTagAPI = () => {
    return axios.get("/api/get-all-tag");
}

const getAllTagWithoutProductAPI = () => {
    return axios.get("/api/get-all-tag-without-product");
}

//PRODUCT TAG
const createProductTagAPI = (data) => {
    return axios.post("/api/create-product-tag", data);
}

const updateProductTagAPI = (data) => {
    return axios.post("/api/update-product-tag", data);
}

const deleteProductTagAPI = (data) => {
    return axios.delete("/api/delete-product-tag", data);
}

//REVIEW
const createNewReviewAPI = (data) => {
    return axios.post("/api/create-new-review", data);
}

const getReviewByProductIdAPI = (inputProductId) => {
    return axios.get("/api/get-review-by-product-id",
        { params: { productId: inputProductId } });
}



export {
    //USER
    getAllUserAPI, createNewUserAPI, adminLoginAPI,
    customerLoginAPI, updateUserAPI, getValidationKeyAPI, changePasswordAPI,
    //ALLCODES
    addNewCodeAPI, getAllCodesAPI, getAllCodesByIdAPI, getAllCodesByKeyMapAPI,
    deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    //SUB CATEGORY
    getAllSubCategoryByCategoryAPI, addNewSubCategoryAPI, deleteSubCategoryAPI,
    getAllSubCategoryAPI, editSubCategoryAPI, getAllSubCategoryByKeyNameAPI,
    //CHILD CATEGORY
    getAllChildCategoryBySubCategoryAPI, addNewChildCategoryAPI,
    getAllChildCategoryAPI, deleteChildCategoryAPI, getChildCategoryByKeyNameAPI,
    //PRODUCT
    addNewProductAPI, updateProductAPI, getAllProductAPI, deleteProductAPI,
    getProductByKeyNameAPI, getProductByCategoryAPI, getProductBySubCategoryAPI,
    getProductByChildCategoryAPI, getProductByNameAPI, updateProductDiscountAPI,
    getProductByIdAPI,
    //CART
    getCartByUserIdAPI,
    //CART PRODUCT
    addToCartAPI, deleteProductInCartAPI, updateCartAPI,
    //USER ADDRESS
    createNewAddressAPI,
    //BILL
    createNewBillAPI, getBillByUserIdAPI, getAllBillAPI, updateBillStatusAPI,
    getBillByIdAPI,
    //TAG
    getProductByTagKeyNameAPI, getTagByTypeAPI, getAllTagAPI,
    getAllTagWithoutProductAPI,
    //PRODUCT TAG
    createProductTagAPI, deleteProductTagAPI, updateProductTagAPI, getProductByTagIdAPI,
    //REVIEW
    createNewReviewAPI, getReviewByProductIdAPI
};