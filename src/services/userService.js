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


export {
    createNewUserAPI, loginAPI,
    addNewCodeAPI, getAllCodesAPI, deleteCodeAPI, editCodeAPI
};