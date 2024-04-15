function path(root, sublink){
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_HOME = '/home';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_PAGE = '/page'

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    signup: path('/signup')
}

export const PATH_HOME = {
    root: ROOTS_HOME
}

 export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    login: path(ROOTS_DASHBOARD, '/dashboard')
 }