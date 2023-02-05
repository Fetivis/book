import IUser from "../interface/user.interface";
import userSchema from "../schema/user.schema";
import IBook from "../interface/book.interface";
import bookSchema from "../schema/book.schema";
import { model } from "mongoose";

import { Request } from "express";

import UserService from "./user.service";
import BookService from "./book.service";

class UserAdminService {
  User = model<IUser>("User", userSchema);
  Book = model<IBook>("Book", bookSchema);
  private UserService = new UserService();
  private BookService = new BookService();

  public async deleteUser(email?: string) {
    if (email) {
      const user = await this.User.findOne({ email: email });

      if (user.role != "admin") {
        await this.User.deleteMany({ email });
        return user;
      } else if (user.active === false && user.role == "admin") {
        await this.User.deleteMany({ email });
        return user;
      } else {
        throw new Error("adminBook");
      }
    }
  }

  public async updateAuthors(req: Request) {
    const response: any = await this.User.updateMany(
      {
        email: req.body.email,
        role: "user",
      },
      { ...req.body }
    );
    if (response.modifiedCount == 0) {
      throw new Error("userDontExist");
    }
    return req.body.email;
  }

  public createAuthor = async (req: Request) => {
    const response = this.UserService.register(req.body);
    return response;
  };

  public async updateBookByAdmin(req: Request) {
    let response: any;
    const user = await this.User.findOne({ email: req.body.email });

    if (user?.role != "admin" && user != undefined) {
      response = await this.Book.updateMany(
        {
          publisher: user.email,
          title: req.body.title,
        },
        { ...req.body }
      );
      return response;
    }
    // example
    // this is part of code for admin to update his book
    // you can comment this because there is another endpoint in book.service for update your book
    else {
      response = await this.BookService.updateBook(req);

      return response;
    }
  }

  public removeAuthorBook = async (req: Request) => {
    const user = await this.User.findOne({ email: req.body.email });
    if (user.role == "admin") throw new Error("adminBook");
    const response = await this.Book.deleteMany({ publisher: user.email });
    if (response.deletedCount == 0) throw new Error("failToRemoveBook");
    return response;
    // I can use service from book to update in this service admin book also, but above is example
    // there is another endpoint for remove your book - I leave like this because of simplicity
  };

  public addAuthorBook = async (req: Request) => {
    const user = await this.User.findOne({ email: req.body.email });
    if (user == null) throw new Error("errorEmail");
    if (user.role == "admin") throw new Error("adminBook");

    const response: any = await this.Book.create({
      publisher: user.email,
      ...req.body,
    });
    if (response.deletedCount == 0) throw new Error("failToRemoveBook");
    return response;
  };
}

export default UserAdminService;
