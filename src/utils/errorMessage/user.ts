export default {
  duplicateEmail: {
    status: 403,
    message: "Email is already in use",
  },
  userDontExist: {
    status: 404,
    message: "user dont exist",
  },
  wrongPassword: {
    status: 403,
    message: "wrong password",
  },
  notAdmin: {
    status: 401,
    message: "you are not admin",
  },
};
