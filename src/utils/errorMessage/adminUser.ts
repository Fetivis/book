export default {
  failToRemoveBook: {
    status: 404,
    message: "Not found book to remove",
  },
  noMatchedTitle: {
    status: 404,
    message: "Title don't exist",
  },
  userDontExist: {
    status: 404,
    message: "Not found user!",
  },
  adminBook: {
    status: 401,
    message: "Can't delete a admin book",
  },
  errorEmail: {
    status: 404,
    message: "Can't find author with that email",
  },
};
