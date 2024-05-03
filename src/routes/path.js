function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_OWNER = "/owner";
const ROOTS_TENANT = "/tenant";
const HOME_PAGE = "/home";
const PROFILE = "/owner/my_profile";
const PROFILE1 = "/tenant/my_profile";
const PROFILE2 = "/dashboard/my_profile";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  signup: path("/signup"),
};

export const PATH_HOME = {
  root: HOME_PAGE,
};

export const PATH_OWNER = {
  root: ROOTS_OWNER,
  my_profile: PROFILE,
  post: "/owner/post",
  motel: "/owner/motel"
};

export const PATH_TENANT = {
  root: ROOTS_TENANT,
  my_profile1: PROFILE1,
  motel: "/tenant/motel"
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  my_profile2: PROFILE2,
  address: "/dashboard/system/address",
  user: "/dashboard/user",
  post: "/dashboard/post"
};
