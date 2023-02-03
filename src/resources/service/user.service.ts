import IUser from "../interface/user.interface";
import { model } from "mongoose";
import userSchema from "../schema/user.schema";
import bcrypt from "bcrypt";
import token, { createToken } from "../../utils/interfaces/token/token";

class UserService {
  User = model<IUser>("User", userSchema);

  public async register(body: IUser): Promise<string | Error> {
    try {
      const { firstName, lastName, password, email, role } = body;
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await this.User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: role,
      });
      const accessToken = createToken(newUser);
      return accessToken;
    } catch (err) {
      throw new Error("duplicateEmail");
    }
  }

  public async login(email: string, password: string): Promise<string | Error> {
    let user = await this.User.findOne({ email: email });
    if (!user || user === null) {
      throw new Error("userDontExist");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw new Error("wrongPassword");
    return token.createToken(user);
  }

  public async deactivatedUser(email: string) {
    try {
      await this.User.find({ email: email }, { active: false });
      return;
    } catch (err) {
      throw new Error("userDontExist");
    }
  }
}

export default UserService;
