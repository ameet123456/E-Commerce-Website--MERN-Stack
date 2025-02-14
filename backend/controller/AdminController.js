const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const getTotalUser = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    res.status(200).json({ totalUser });
  } catch (error) {
    console.error("Error fetching total registered users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AverageTime = async (req, res) => {
  try {
    const avgTimeSpend = await User.aggregate([
      {
        $group: {
          _id: null,
          avgTime: { $avg: "$totalTimeSpent" },
        },
      },
    ]);
    
    res.status(200).json({
        avgTimeSpend: avgTimeSpend[0]?.avgTime || 0, // Handle case where no users exist
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTotalUser,AverageTime,
};
