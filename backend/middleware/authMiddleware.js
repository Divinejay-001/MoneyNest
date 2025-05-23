const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // ✅ was split("") — wrong
    console.log("Token extracted from headers:", token);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]; // ✅ Correct split by space
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
