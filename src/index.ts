import "dotenv/config";
import App from "./app";
import UserController from "./resources/controller/user.controller";
import BookController from "./resources/controller/book.controller";
import UserAdminController from "./resources/controller/adminUser.controller";
const app = new App(
  [new UserController(), new BookController(), new UserAdminController()],
  Number(process.env.PORT)
);
app.listen();
