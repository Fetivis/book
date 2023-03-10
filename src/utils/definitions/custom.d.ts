import IUser from "../../resources/interface/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
