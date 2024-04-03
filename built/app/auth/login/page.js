"use client";
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
Object.defineProperty(exports, "__esModule", { value: true });
var agent_1 = require("@/dataProvider/agent");
var material_1 = require("@mui/material");
var notistack_1 = require("notistack");
var react_1 = require("react");
var react_2 = require("react");
var SnackbarProvider_1 = require("@/component/snackbar/SnackbarProvider");
function page() {
    var _this = this;
    var _a = (0, react_2.useState)(''), userName = _a[0], setUserName = _a[1];
    var _b = (0, react_2.useState)(''), password = _b[0], setPassword = _b[1];
    var handleReset = function () {
        setUserName('');
        setPassword('');
    };
    var enqueueSnackbar = (0, notistack_1.useSnackbar)().enqueueSnackbar;
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var loginForm, res, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginForm = {
                        email: userName,
                        password: password,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, agent_1.loginByAdmin)(loginForm)];
                case 2:
                    res = _b.sent();
                    console.log(res);
                    if (res.status < 400) {
                        console.log("Login successful");
                        // Hiển thị snackbar khi đăng nhập thành công
                        enqueueSnackbar("Login Successfully", { variant: "success" });
                        localStorage.setItem("access_token", (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.token);
                    }
                    else {
                        console.log("Invalid UserName or Password");
                        // Hiển thị snackbar khi đăng nhập thất bại
                        enqueueSnackbar("Invalid UserName or Password", { variant: "error" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("An error occurred during login:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onUserNameChange = function (event) {
        var _a;
        setUserName((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
    };
    var onPwdChange = function (event) {
        var _a;
        setPassword((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
    };
    return (<>
            <material_1.Container>
                <SnackbarProvider_1.default />
                <material_1.Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
                    <material_1.Card sx={{ width: '50%', p: 5 }}>
                        <material_1.Stack>
                            <material_1.Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold', justifyContent: 'center', mt: 3 }}>WELCOME TO THE MOTEL WEB</material_1.Typography>
                            <material_1.TextField sx={{ mt: 3 }} label="Email" fullWidth value={userName} onChange={function (event) { return onUserNameChange(event); }}/>
                            <material_1.TextField sx={{ mt: 3 }} label="Password" value={password} type='password' fullWidth onChange={function (event) { return onPwdChange(event); }}/>
                            <material_1.Stack direction='row' spacing={3} sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                                <material_1.Button variant='contained' onClick={function () { return handleReset(); }}>Reset</material_1.Button>
                                <material_1.Button variant='contained' onClick={function () { return handleSubmit(); }}>Submit</material_1.Button>
                            </material_1.Stack>
                        </material_1.Stack>
                    </material_1.Card>
                </material_1.Box>
            </material_1.Container>
        </>);
}
exports.default = page;
