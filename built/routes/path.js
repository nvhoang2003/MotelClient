"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATH_AUTH = void 0;
function path(root, sublink) {
    return "".concat(root).concat(sublink);
}
var ROOTS_AUTH = '/auth';
var ROOTS_DASHBOARD = '/dashboard';
var ROOTS_PAGE = '/page';
exports.PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
};
