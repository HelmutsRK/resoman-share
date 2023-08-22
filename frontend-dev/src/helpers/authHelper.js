import axios from 'axios';
import {saveToLocalStorage, deleteFromLocalStorage, getFromLocalStorage} from "./localStorage";

export const validateUserAuth = () => {
    const userLocalStorage = getFromLocalStorage("user");
    const tokenLocalStorage = getFromLocalStorage("token");

    if (userLocalStorage && tokenLocalStorage) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${tokenLocalStorage}`;
        return true;
    }

    return false;
}

export const saveUserAuthDataInLocalStorage = (token, user) => {
    if (token && user)
    {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        saveToLocalStorage("user", user);
        saveToLocalStorage("token", token);
    }
}

export const deleteUserAuthDataInLocalStorage = () => {
    const userLocalStorage = getFromLocalStorage("user");
    const tokenLocalStorage = getFromLocalStorage("token");

    if (userLocalStorage && tokenLocalStorage)
    {
        delete axios.defaults.headers.common["Authorization"];
        deleteFromLocalStorage("user");
        deleteFromLocalStorage("token");
    }
}