import { Router, Response, NextFunction, Request } from "express";
import Controller from "../../utils/interfaces/controller/controller.interfaces";

import {
  authentificatedMiddelware,
  isAdmin,
} from "../../middleware/authenticated.middelware";
import UserAdminService from "../../resources/service/adminUser.service";
import UserAdminErrors from "../../utils/errorMessage/adminUser";

class UserAdminController implements Controller {
  public path = "/admin";

  public router = Router();
  private UserAdminService = new UserAdminService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.delete(
      `${this.path}/deleteUser`,
      authentificatedMiddelware,
      isAdmin,
      this.deleteUser
    );
    this.router.put(
      `${this.path}/updateAuthor`,
      authentificatedMiddelware,
      isAdmin,
      this.updateAuthors
    );
    this.router.post(
      `${this.path}/createAuthor`,
      authentificatedMiddelware,
      isAdmin,
      this.createAuthor
    );
    this.router.put(
      `${this.path}/updateBook`,
      authentificatedMiddelware,
      isAdmin,
      this.updateBookByAdmin
    );

    this.router.delete(
      `${this.path}/deleteBook`,
      authentificatedMiddelware,
      isAdmin,
      this.removeAuthorBook
    );

    this.router.post(
      `${this.path}/addBook`,
      authentificatedMiddelware,
      isAdmin,
      this.addAuthorBook
    );
  }

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email } = req.body;

      const user = await this.UserAdminService.deleteUser(email);
      res.send(user);
    } catch (err: any) {
      next({
        status: UserAdminErrors[err.message]?.status,
        message: UserAdminErrors[err.message]?.message,
      });
    }
  };

  private updateAuthors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const response = await this.UserAdminService.updateAuthors(req);

      res.status(200).json(`User is updated: ${response}`);
    } catch (err: any) {
      next({
        status: UserAdminErrors[err.message]?.status,
        message: UserAdminErrors[err.message]?.message,
      });
    }
  };

  private createAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.UserAdminService.createAuthor(req);

      res.status(201).json({ user: user, message: "User is created!" });
    } catch (err: any) {
      next({
        status: UserAdminErrors[err.message]?.status,
        message: UserAdminErrors[err.message]?.message,
      });
    }
  };

  private updateBookByAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const response = await this.UserAdminService.updateBookByAdmin(req);

      res.status(200).send(`Book is updated: ${response}`);
    } catch (err: any) {
      next({
        status: UserAdminErrors[err.message]?.status,
        message: UserAdminErrors[err.message]?.message,
      });
    }
  };

  private removeAuthorBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const book = await this.UserAdminService.removeAuthorBook(req);

      res.status(201).json({ book });
    } catch (err: any) {
      next({
        status: UserAdminErrors[err.message]?.status,
        message: UserAdminErrors[err.message]?.message,
      });
    }
  };

  private addAuthorBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.UserAdminService.addAuthorBook(req);
      res.status(201).json({ user });
    } catch (err: any) {
      next({
        status: UserAdminErrors[err.message]?.status,
        message: UserAdminErrors[err.message]?.message,
      });
    }
  };
}
export default UserAdminController;
