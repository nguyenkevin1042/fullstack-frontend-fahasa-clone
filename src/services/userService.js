import axios from "../axios";

//USER
const createNewUserAPI = (data) => {
    return axios.post("/api/create-new-user", data);
}

const loginAPI = (inputEmail, inputPassword) => {
    return axios.post("/api/login", {
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
        data: {
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
const getAllSubCategoryByCategoryTypeAPI = (inputCategoryType) => {
    return axios.get("/api/get-all-sub-category-by-category-type",
        { params: { categoryType: inputCategoryType } });
}

const addNewSubCategoryAPI = (data) => {
    return axios.post("/api/add-new-sub-category", data);
}


export {
    createNewUserAPI, loginAPI,
    addNewCodeAPI, getAllCodesAPI, getAllCodesByIdAPI, deleteCodeAPI, editCodeAPI, getCodeByTypeAPI,
    getAllSubCategoryByCategoryTypeAPI, addNewSubCategoryAPI,
    getAllSubCategoryAPI
};