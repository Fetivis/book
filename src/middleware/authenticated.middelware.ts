import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/interfaces/token/token";
import { JwtPayload } from "jsonwebtoken";
import { model } from "mongoose";
import userSchema from "../resources/schema/user.schema";
import IUser from "../resources/interface/user.interface";

export async function authentificatedMiddelware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const User = model<IUser>("User", userSchema);

  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).send("You are not authorized");
  }
  const accessToken = bearer?.split("Bearer ")[1].trim();
  try {
    const jwtPayload: JwtPayload = await verifyToken(accessToken!);

    const user = await User.findOne({ email: jwtPayload.email })
      .select("-password")
      .exec();

    if (!user) {
      return res.status(401).send("not valid token");
    }
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).send("not valid token");
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role.trim().toLowerCase() === "admin") {
    return next();
  } else {
    throw new Error("you are not admin!");
  }
};
