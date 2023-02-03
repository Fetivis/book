import { Router, Response, NextFunction, Request } from "express";
import Controller from "../../utils/interfaces/controller/controller.interfaces";
import { authentificatedMiddelware } from "../../middleware/authenticated.middelware";
import BookService from "../../resources/service/book.service";
import bookError from "../../utils/errorMessage/book";

class UserController implements Controller {
  public path = "/book";

  public router = Router();
  private BookService = new BookService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(
      `${this.path}/new`,
      authentificatedMiddelware,
      this.createBook
    );

    this.router.delete(
      `${this.path}/delete`,
      authentificatedMiddelware,
      this.RemoveBook
    );

    this.router.put(
      `${this.path}/updated`,
      authentificatedMiddelware,
      this.UpdateBook
    );
  }

  private createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const book = await this.BookService.CreateBook(req);

      res.status(201).json({ book });
    } catch (err: any) {
      next({
        status: bookError[err.message]?.status,
        message: bookError[err.message]?.message,
      });
    }
  };

  private RemoveBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await this.BookService.RemoveBook(req);
      res.status(200).json(`book is removed`);
    } catch (err: any) {
      next({
        status: bookError[err.message]?.status,
        message: bookError[err.message]?.message,
      });
    }
  };

  private UpdateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const book = await this.BookService.UpdateBook(req);
      res.status(200).json(`book is updated: ${book} `);
    } catch (err: any) {
      next({
        status: bookError[err.message]?.status,
        message: bookError[err.message]?.message,
      });
    }
  };
}
export default UserController;
