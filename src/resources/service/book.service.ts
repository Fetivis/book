import IBook from "../interface/book.interface";
import { model } from "mongoose";
import bookSchema from "../schema/book.schema";
import { Request } from "express";

class BookService {
  Book = model<IBook>("Book", bookSchema);

  public CreateBook = async (req: Request) => {
    try {
      if (req.user.email) {
        const newBook = await this.Book.create({
          publisher: req.user.email,
          ...req.body,
        });
        return newBook;
      }
    } catch (err) {
      throw new Error("failToCreateBook");
    }
  };

  public RemoveBook = async (req: Request) => {
    try {
      const {title} = req.params;
      const user = req.user.email;
      const response = await this.Book.deleteMany({ publisher: user, title: title });
      if (response.deletedCount == 0) {
        throw new Error(`noMatchedTitle`);
      }
      return response;
    } catch (err) {
      throw new Error("failToRemoveBook");
    }
  };

  public UpdateBook = async (req: Request) => {
    const user = req.user.email;

    const response = await this.Book.updateMany(
      { publisher: user, title: req.body.title },
      { ...req.body }
    );
    if (response.modifiedCount === 0) {
      throw new Error("noMatchedTitle");
    }
    return req.body.title;
  };
}

export default BookService;
