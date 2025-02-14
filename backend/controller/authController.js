const usersModel=require("../models/user_model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user_model");

//getUser
module.exports.getUser=async function(req,res){
    try {
        const user= await usersModel.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
}
//signin 
module.exports.registerUser = async function(req, res) {
    const { fullname, email, password } = req.body;

    // Input validation
    if (!fullname || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    try {
        // Check if user already exists
        const existingUser = await usersModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User already has an account");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await usersModel.create({
            fullname,
            email,
            password: hashedPassword
        });

        return res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error during user registration:", err);
        return res.status(500).send("Server error during registration");
    }
}

//login
module.exports.loginUser = async function (req, res) {
    const { fullname, password } = req.body;

    //console.log("Request Body:", req.body);

    if (!fullname || !password) {
        return res.status(400).json({ message: "Fullname and password are required." });
    }

    try {
        const user = await usersModel.findOne({ fullname });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid fullname or password." });
        }

        const jwtSecret = process.env.JWTTOKEN; 
        if (!jwtSecret) {
            console.error("JWT secret not configured.");
            return res.status(500).json({ message: "Server configuration error." });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: "Successfully logged in.", token });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
};


//logout
module.exports.logoutUser = async function (req, res) {
    try {
        // Ensure userId exists
        const userId = req.user?.userId;
        if (!userId) return res.status(400).json({ message: "User not authenticated." });

        // Find user and handle not found
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        // Process logout only if there's a login history
        const lastLogin = user.loginHistory.at(-1); // Fetch the last login record
        if (lastLogin && !lastLogin.logoutTime) {
            const now = new Date();
            if (!lastLogin.loginTime) {
                return res.status(400).json({ message: "Invalid login session." });
            }
            lastLogin.logoutTime = now;
            lastLogin.duration = Math.round((now - new Date(lastLogin.loginTime)) / 60000);
            user.totalTimeSpent = (user.totalTimeSpent || 0) + lastLogin.duration;
            await user.save();
        }

        return res.status(200).json({ message: "Logout successful.",totalTimeSpent: user.totalTimeSpent  });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};
