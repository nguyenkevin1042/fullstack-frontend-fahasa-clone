import axios from "../axios";

//USER
const createNewUserAPI = (data) => {
    return axios.post("/api/create-new-user", data);
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

const getAllProductAPI = () => {
    return axios.get("/api/get-all-product");
}

const getProductByKeyNameAPI = (inputKeyName) => {
    return axios.get("/api/get-product-by-key-name",
        { params: { keyName: inputKeyName } });
}

const deleteProductAPI = (inputId) => {
    return axios.delete("/api/delete-product",
        { params: { id: inputId } }
    );
}


export {
    createNewUserAPI, adminLoginAPI, customerLoginAPI,
    addNewCodeAPI, getAllCodesAPI, getAllCodesByIdAPI,
    deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    getAllSubCategoryByCategoryAPI, addNewSubCategoryAPI, deleteSubCategoryAPI,
    getAllSubCategoryAPI, editSubCategoryAPI,
    getAllChildCategoryBySubCategoryAPI, addNewChildCategoryAPI, getAllChildCategoryAPI,
    deleteChildCategoryAPI, getChildCategoryByKeyNameAPI,
    addNewProductAPI, getAllProductAPI, getProductByKeyNameAPI, deleteProductAPI
};