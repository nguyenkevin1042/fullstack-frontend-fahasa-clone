import axios from "../axios";

const createNewUserAPI = (data) => {
    return axios.post("/api/create-new-user", data);
}

const loginAPI = (inputEmail, inputPassword) => {
    return axios.post("/api/login", {
        email: inputEmail,
        password: inputPassword
    });
}


export {
    createNewUserAPI, loginAPI
};