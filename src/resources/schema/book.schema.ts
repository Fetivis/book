import { Schema } from "mongoose";
import IBook from "../interface/book.interface";

const BookSchema = new Schema<IBook>(
  {
    publisher: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    pages: {
      type: Number,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default BookSchema;
