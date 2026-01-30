import jwt from "jsonwebtoken";
import { userModel } from "../modules/user.js";

export const checkAuth = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "cations" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "token invalid" });
    }

    const decoded = jwt.verify(token, "secret321");

    req.user = decoded;

    const user_found = await userModel.findById(decoded.id);
    if (!user_found) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    if (user_found.isVerified !== true) {
      await userModel.findByIdAndDelete(decoded.id);
      
      return res
      .status(400)
      .json({ message: "Account wasn't verified so we deleted it!" });
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ valid: false, reason: "Token expired" });
    }
    console.error("Server error occured", error);
    res.status(500).json({ message: "Server error occured" });
  }
};
