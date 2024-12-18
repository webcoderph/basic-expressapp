import Users from "../models/Users.js";
import { encrypt } from "../utilities/password.js";
import jwt from "jsonwebtoken";

function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

class AuthServices {
  static async login(email, password) {
    if (!isEmail(email)) throw new Error("Email is not valid!");
    if (!email || !password)
      throw new Error("Email and password are required!");

    const { sign } = jwt;

    const user = await Users.getUserByEmail(email);
    if (!user) throw new Error("User not found!");

    if (user && user[0].password !== encrypt(password)) {
      throw new Error("Invalid password!");
    }

    const payload = {
      email: user[0].email,
      user_id: user[0].user_id,
    };

    const token = sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "2 days",
    });

    return {
      token,
    };
  }

  static async register(data) {
    data.password = encrypt(data.password);
    if (!isEmail(data.email)) throw new Error("Email is not valid!");

    const user = await Users.create(data);
    if (!user) throw new Error("Oops something went wrong!");

    return user;
  }
}
export default AuthServices;
