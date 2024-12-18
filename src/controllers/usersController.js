import Users from "../models/Users.js";
import AuthServices from "../services/AuthServices.js";

class UsersController {
  static async register(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await Users.getUserByEmail(email);

      if (
        existingUser &&
        Array.isArray(existingUser) &&
        existingUser.length > 0
      ) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await AuthServices.register(req.body);

      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const user = await AuthServices.login(req.body.email, req.body.password);

      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}
export default UsersController;
