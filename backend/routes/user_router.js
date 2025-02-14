const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser
} = require("../controller/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/getuser",verifyToken,getUser);

module.exports = router;