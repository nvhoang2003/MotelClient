import axios from "axios";
import { PATH_AUTH, PATH_HOME } from "../routes/path";
const instance = axios.create({
    baseURL: `http://localhost:8080/`,
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

const clearLocalStorage = () => {
    localStorage.clear();
};

instance.interceptors.response.use(responseOnSuccessMiddleware, responseOnErrorMiddleware);


function responseOnSuccessMiddleware(res) {
    return res;
}

function responseOnErrorMiddleware(error) {
    var { status } = error.response;
    if (status === 401) {
        localStorage.clear();
        // window.location.href = PATH_AUTH.login;
        window.location.href = PATH_HOME.root;
    }
    if(status === 403) {
        window.location.href = PATH_HOME.root;
    }
    return error;
}

// const getApi = async ()

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
//GET
// const getListPost = (null) => {
//     return get
// }
//POST

//Login
const loginByAdmin = (payload) => {
    return postApi('rest/auth/login', payload);
}

const createThePost = (payload) => {
    return postApi('api/posts', payload)
}

export {
    loginByAdmin,createThePost
}
