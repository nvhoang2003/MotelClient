import axios from "axios";
import { PATH_AUTH, PATH_HOME } from "../routes/path";
const instance = axios.create({
    baseURL: `http://localhost:8080/`,
    timeout: 60000
});

const getLocalStorage = (key) => {
    if (typeof window !== "undefined") {
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
        window.location.href = PATH_AUTH.login;
    }
    if (status === 403) {
        window.location.href = PATH_HOME.root;
    }
    return error;
}

// const getApi = async ()

const postApi = async (url, payload, file) => {
    const token = getLocalStorage("access_token");
    try {
        const res = await instance.post(`/${url}`, payload, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "no-author",
                "Content-Type": file
                    ? "multipart/form-data"
                    : "application/json; charset=utf-8",
                // 'Access-Control-Allow-Headers':
                //     'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Origin": "*",
            },
            timeout: 600000,
        });
        return res;
    } catch (err) {
        return err;
    }
};

async function putApi(url, payload) {
    const token = getLocalStorage("access_token");
    try {
        const res = await instance.put(`/${url}`, payload, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "no-author",
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}

async function deleteApi(url, payload) {
    const token = getLocalStorage("access_token");

    try {
        const res = await instance.delete(`/${url}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "no-author",
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}

async function getApi(url, params) {
    // delete all params fail
    const paramObj = {};
    if (params && Object.keys(params).length) {
        Object.keys(params).forEach(function (key) {
            if (params[key]) {
                paramObj[key] = params[key];
            }
        });
    }

    const token = getLocalStorage("access_token");
    try {
        const res = await instance.get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "no auth",
            },
            params: paramObj,
        });
        return res;
    } catch (err) {
        return err;
    }
}

async function getApiV2(url) {
    const token = getLocalStorage("access_token");
    try {
        const res = await instance.get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "no auth",
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}
//Post
const getMyPost = () => {
    return getApi('api/myposts');
}

const createThePost = (payload) => {
    return postApi('api/posts', payload)
}

const getPostByid = (id) => {
    return getApi('api/posts/' + id);
}

const updateThePost = (id, payload) => {
    return putApi(`api/posts/${id}`, payload);
}

const deleteThePost = (id) => {
    return deleteApi(`api/posts/${id}`);
}

//Login
const signUpAccount = (payload, isOWner) => {
    return postApi("rest/auth/regis/" + isOWner, payload)
}

const loginByAdmin = (payload) => {
    return postApi("rest/auth/login", payload);
};

//City
function getCity() {
    return getApi("api/city");
}

const addCity = (payload) => {
    return postApi("api/city", payload);
};

const editCity = (payload, id) => {
    return putApi("api/city/" + id, payload);
};

const deleteCity = (id) => {
    return deleteApi("api/city/" + id);
};

export {
    loginByAdmin,
    getCity,
    addCity,
    editCity,
    deleteCity,
    createThePost,
    getPostByid,
    updateThePost,
    getMyPost,
    deleteThePost,
    signUpAccount
};
