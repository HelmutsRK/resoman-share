import axios from 'axios';
import {deleteUserAuthDataInLocalStorage} from "./authHelper";

export const api = async ({
    method = "GET",
    endpoint = "/",
    data = {},
    successCallback = () => {},
    failureCallback = () => {},
}) => {
    let axiosConfig = {
        method: method,
        url: `http://127.0.0.1/api${endpoint}`
    }

    if (method === 'GET') {
        axiosConfig.params = data;
    } else {
        axiosConfig.data = data;
    }

    await axios(axiosConfig)
        .then((response) => successCallback(response))
        .catch((err) => {
            if (err.response.status === 401) {
                deleteUserAuthDataInLocalStorage();
            }

            failureCallback(err)
        });
}