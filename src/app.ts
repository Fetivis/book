import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Controller from "./utils/interfaces/controller/controller.interfaces";
import ErrorHandler from "./middleware/errorHandler";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialzeMiddleware();
    this.initialzeControllers(controllers);
  }

  //connection to mongoDb
  private initialiseDatabaseConnection(): void {
    const { MONGO_PATH, MONGO_USER, MONGO_PASSWORD } = process.env;
    mongoose.set("strictQuery", false);
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
      () => {
        console.log("connected to the database");
      }
    );
  }

  // adding controllers for routing
  private initialzeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
    // custom errorHandler middelware
    this.express.use(ErrorHandler);
    //swagger
    this.express.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  // all midedelware that express app need!
  private initialzeMiddleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App is running on port: ${this.port}`);
    });
  }
}
export default App;
