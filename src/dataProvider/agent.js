import axios from "axios";
import { PATH_AUTH } from "../routes/path";
const instance = axios.create({
    baseURL: `http://localhost:8080/rest`,
    timeout: 60000
});

const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        if (item) {
            return item;
        }
    }
    return null;
};

function responseOnSuccessMiddleware(res) {
    return res;
}

function responseOnErrorMiddleware(error) {
    const { status } = error.response;
    if (status === 401) {
        localStorage.clear();
        window.location.href = PATH_AUTH.login;
    }
    return error;
}
const clearLocalStorage = () => {
    localStorage.clear();
};

const postApi = async (url, payload, file) => {
    const token = getLocalStorage('access_token');
    try {
        const res = await instance.post(`/${url}`, payload, {
            headers: {
                Authorization: token ? `Bearer ${token}` : 'no-author',
                'Content-Type': file ? 'multipart/form-data' : 'application/json; charset=utf-8',
                // 'Access-Control-Allow-Headers':
                //     'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*',
            },
            timeout: 600000
        });
        return res;
    } catch (err) {
        return err;
    }
}


//Post

//Login
const loginByAdmin = (payload) => {
    return postApi('auth/login', payload);
}

export {
    loginByAdmin,
}
