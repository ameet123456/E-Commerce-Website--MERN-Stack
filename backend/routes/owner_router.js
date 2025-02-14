  const express = require("express");
  const router = express.Router();
  const ownerModel = require("../models/owner_model");
  const{ getTotalUser,AverageTime} = require("../controller/AdminController")
  const { body, validationResult } = require("express-validator");
  const bcrypt = require ("bcrypt")
  const jwt = require("jsonwebtoken");

  router.get("/", (req, res) => {
    res.send("hey");
  });

  async function createAdmin() {
    try {
      console.log("Connected to MongoDB!");

      // Check if an admin already exists
      const existingAdmin = await ownerModel.findOne();
      if (existingAdmin) {
        console.log("Admin already exists:", existingAdmin);
        return;
      }

      // Admin details
      const adminDetails = {
        fullName: "Admin User", // Change this to your desired name
        email: "admin@example.com", // Change this to your desired email
        password: await bcrypt.hash("123456", 10), // Hash the password (optional)
      };

      // Create admin
      const admin = await ownerModel.create(adminDetails);

      console.log("Admin created successfully:")
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  }

  //createAdmin();

  router.post(
    "/login",

    async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "email and password are required." });
      }
      try {
        const owner = await ownerModel.findOne({ email });
        if (!owner) {
          return res.status(401).json({ message: "No owner found" });
        }
        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { id: owner._id, email: owner.email, isAdmin: true },
          process.env.JWTTOKEN,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          message: "Login successful",
          token,
          admin: {
            id: owner._id,
            fullName: owner.fullName,
            email: owner.email,
          },
        });
        
      } catch (error) {
        res.status(500).send(error);
        console.log(error)
      }
    }
  );
  module.exports = router;


  router.get("/totalUser", getTotalUser);
  router.get("/avgTimeSpend", AverageTime);