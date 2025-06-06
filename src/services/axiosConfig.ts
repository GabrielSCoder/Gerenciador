import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { API_URL } from "../utils/api";

const success = (res: AxiosResponse) => {
    const newToken = res.headers["authorization"];

    if (newToken) {
        const tokenValue = newToken.split(" ")[1];
        localStorage.setItem("profile", tokenValue);
    }

    return res;
}

const error = (err: AxiosError) => {

    if (err.response?.status === 401 || err.response?.status === 500) {
        console.log(err.request.responseURL)
        // if (err.request.responseURL != `${API_URL}auth/login`) {
        //     window.localStorage.removeItem("profile");
        //     window.location.href = "/";
        // }
    }

    return Promise.reject(err);
};

const getaxios = async (timeout = 20000) => {
    const instance: AxiosInstance = axios.create({
        baseURL: API_URL,
        timeout: timeout
    });

    // instance.interceptors.response.use(success, error);

    return instance;
};

export default getaxios;