import { userModel } from "../modules/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// this must have the whole user's object
const createToken = (user) => {
  return jwt.sign({ id: user._id }, "secret321", { expiresIn: "72h" });
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
    if (exists) {
      return res
        .status(400)
        .json({ message: "User with the same email exists" });
    }

    if (!exists) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        username,
        password: hashedPassword,
        email,
      });
      await newUser.save();
      await sendCodeToUserEmail(email);
      return res.status(201).json({
        message:
          "user created successfuly but not verified yet, check your email to verify your account",
      });
    }

    return res.status(400).json({ message: "User already exists" });
  } catch (error) {
    console.error("Error occured", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// must contain email
export const sendCodeToUserEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bebap81246@gmail.com",
      pass: "asol ldqm lbxq lfkm",
    },
  });
  const idSendToEmail = Math.floor(100000 + Math.random() * 900000).toString();
  const createTokenEmail = jwt.sign(
    { email, code: idSendToEmail, purpose: "email_verify" },
    "secret321",
    { expiresIn: "15m" },
  );

  const info = await transporter.sendMail({
    from: '"Your trusted company" <maddison53@ethereal.email>',
    to: `${email}`,
    subject: "Hello ✔",
    text: `Verificaiton code: ${createTokenEmail}`,
    html: `
  <div style="font-family: Arial, sans-serif;">
    <h2>Email Verification</h2>

    <p>Your verification link:</p>

    <a
      href="http://localhost:5173/email-verification-next?createTokenEmail=${createTokenEmail}"
      style="
        display: inline-block;
        padding: 12px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      "
    >
      Verify your account
    </a>

    <p style="margin-top: 20px;">
      If you didn’t request this, please ignore this email.
    </p>
  </div>
`,
  });

  console.log("Message sent", info.messageId);
};

// must contain the code send at email
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(404)
        .json({ message: "You didn't provide the verification code" });
    }

    const response = jwt.verify(code, "secret321");
    if (!response) {
      return res.status(400).json({ message: "The code as incorrect" });
    } else {
      const user = await userModel.findOne({ email: response.email });
      user.isVerified = true;
      await user.save();

      const token = createToken(user);
      return res.status(200).json({ message: "Verified successfully", token });
    }
  } catch (error) {
    console.error("An error occured", error);
    return res.status(500).json({ message: "Server error occured" });
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
