import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
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

    next();
  } catch (error) {
    console.error("Server error occured", error);
    res.status(500).json({ message: "Server error occured" });
  }
};
