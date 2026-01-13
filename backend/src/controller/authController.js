import { userModel } from "../modules/user.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  return jwt.sign({ id: user._id }, "secret321");
};

export const signUp = async (req, res) => {
  try {
    const { password, username, email } = req.body;

    if (!password || !username || !email) {
      return res
        .status(400)
        .json({ message: "Password or username or the email wasn't given" });
    }

    const exists = await userModel.findOne({ email });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        username,
        password: hashedPassword,
        email,
      });

      const user = await newUser.save();
      const token = createToken(user);

      return res
        .status(201)
        .json({ message: "user created successfuly", token });
    }
    return res.status(400).json({ message: "User already exists" });
  } catch (error) {
    console.error("Error occured", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Password or email wasn't given" });
    }
    const exists = await userModel.findOne({ email });

    if (!exists) {
      return res.status(404).json({ message: "User wasn't found" });
    }

    const compare = bcrypt.compare(password, exists.password);

    if (!compare) {
      return res.status(400).json({ message: "password was incorrect" });
    }

    const token = createToken(exists._id);

    return res.status(201).json({ message: "user created successfuly", token });
  } catch (error) {
    console.error("Error occured", error);
    return res.status(500).json({ message: "Server error" });
  }
};
