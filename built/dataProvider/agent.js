"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginByAdmin = void 0;
var axios_1 = require("axios");
var path_1 = require("@/routes/path");
var instance = axios_1.default.create({
    baseURL: "http://localhost:8080/rest",
    timeout: 60000
});
var getLocalStorage = function (key) {
    if (typeof window !== 'undefined') {
        var item = localStorage.getItem(key);
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
    var status = error.response.status;
    if (status === 401) {
        localStorage.clear();
        window.location.href = path_1.PATH_AUTH.login;
    }
    return error;
}
var clearLocalStorage = function () {
    localStorage.clear();
};
var postApi = function (url_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1], args_1, true), void 0, function (url, payload, file) {
        var token, res, err_1;
        if (payload === void 0) { payload = null; }
        if (file === void 0) { file = null; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage('access_token');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, instance.post("/".concat(url), payload, {
                            headers: {
                                Authorization: token ? "Bearer ".concat(token) : 'no-author',
                                'Content-Type': file ? 'multipart/form-data' : 'application/json; charset=utf-8',
                                // 'Access-Control-Allow-Headers':
                                //     'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
                                'Access-Control-Allow-Methods': 'POST',
                                'Access-Control-Allow-Origin': '*',
                            },
                            timeout: 600000
                        })];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 4: return [2 /*return*/];
            }
        });
    });
};
//Post
//Login
var loginByAdmin = function (payload) {
    return postApi('auth/login', payload);
};
exports.loginByAdmin = loginByAdmin;
