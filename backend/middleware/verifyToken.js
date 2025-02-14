const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const Admin = require("../models/owner_model");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWTTOKEN);
    req.user = decoded; // Attach decoded payload to req.user

    // Check if the user is an admin
    const admin = await Admin.findById(decoded.id);
    if (admin) {
      req.user.role = "admin";
      return next();
    }

    // Check if the user is a regular user
    const user = await User.findById(decoded.id);
    if (user) {
      req.user.role = user.isAdmin ? "admin" : "user";
      return next();
    }

    // If no user or admin is found with the decoded id
    return res.status(404).json({ message: "User not found." });

  } catch (err) {
    return res.status(401).json({ message: "Invalid token.", error: err.message });
  }
};

module.exports = verifyToken;
