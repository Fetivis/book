import Jwt from "jsonwebtoken";
import IUser from "../../../resources/interface/user.interface";
import Token from "./token.interface";

export const createToken = (user: IUser): string => {
  return Jwt.sign(
    { email: user.email, lastName: user.lastName },
    process.env.JWT_SECRET as Jwt.Secret,
    {
      expiresIn: 3600 * 24 * 10,
    }
  );
};

export const verifyToken = async (Token: string) => {
  return new Promise((resolve, rejects) => {
    Jwt.verify(Token, process.env.JWT_SECRET as Jwt.Secret, (err, payload) => {
      if (err) return rejects(err);

      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
