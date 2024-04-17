function path(root, sublink){
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_OWNER = '/owner'
const ROOTS_TENANT = '/tenant'
const HOME_PAGE = '/home';

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    signup: path('/signup')
}

export const PATH_HOME = {
    root: HOME_PAGE
}

export const PATH_OWNER = {
    root: ROOTS_OWNER
}

export const PATH_TENANT = {
    root: ROOTS_TENANT
}

 export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
 }