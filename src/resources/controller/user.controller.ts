import { Router, Response, NextFunction, Request } from "express";
import Controller from "../../utils/interfaces/controller/controller.interfaces";
import { authentificatedMiddelware } from "../../middleware/authenticated.middelware";
import UserService from "../../resources/service/user.service";
import UserErrors from "../../utils/errorMessage/user";

class UserController implements Controller {
  public path = "/auth";

  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(`${this.path}/signup`, this.createUser);
    this.router.post(`${this.path}/login`, this.login);
    this.router.patch(
      `${this.path}/deactivated`,
      authentificatedMiddelware,
      this.deactivatedUser
    );
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.UserService.register(req.body);
      res.status(201).json({ user });
    } catch (err: any) {
      next({
        status: UserErrors[err.message]?.status,
        message: UserErrors[err.message]?.message,
      });
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const user = await this.UserService.login(email, password);
      res.status(200).send(user);
    } catch (err: any) {
      next({
        status: UserErrors[err.message]?.status,
        message: UserErrors[err.message]?.message,
      });
    }
  };

  // deactivate your profile author or admin
  private deactivatedUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await this.UserService.deactivatedUser(req.user.email);
      res.status(200).send("User is deactivated");
    } catch (err: any) {
      res.status(400).send(`${err}`);
    }
  };
}
export default UserController;
