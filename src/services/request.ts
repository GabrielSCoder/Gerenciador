import getaxios from "./axiosConfig";

export const getRequest = async (url: string) => {

    const axios = await getaxios();
    const hmac = window.localStorage.getItem("NIF")

    try {
        return axios.get(url, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now(),
            },
            withCredentials : true
        });

    } catch (error) {
        throw (error)
    }
}

export const postRequest = async (url: string, obj: any) => {

    const hmac = window.localStorage.getItem("NIF")
    const axios = await getaxios();

    try {
        return await axios.post(url, obj, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC: hmac,
                Timestamp: Date.now()
            },
            withCredentials: true,
        });
    } catch (error: any) {
        console.error("Erro na requisição:", error.response ? error.response.data : error);
        throw error;
    }
};


export const putRequest = async (url: string, obj: any) => {

    const hmac = window.localStorage.getItem("NIF")
    const axios = await getaxios();

    try {
        return axios.put(url, obj, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now()
            },
            withCredentials : true
        });
    } catch (error: any) {
        throw (error);
    }
};


export const postRequestWoError = async (url: string, obj: any) => {
    const hmac = window.localStorage.getItem("NIF")
    const axios = await getaxios();

    try {
        return axios.post(url, obj, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now()
            },
            withCredentials : true
        });
    } catch (error: any) {
        return (error);
    }
}

export const deleteRequest = async (url: string) => {

    const axios = await getaxios();
    const hmac = window.localStorage.getItem("NIF")

    try {
        return axios.delete(url, {
            headers: {
                Authorization: window.localStorage.getItem("profile") ? `Bearer ${window.localStorage.getItem("profile")}` : "",
                HMAC : hmac,
                timestamp : Date.now(),
            },
            withCredentials : true
        });

    } catch (error) {
        throw (error)
    }
}
