require('dotenv').config();
const mongoose = require('mongoose');
const debg = require("debug")("development:mongoose");





mongoose.connect(
  process.env.MONGOOSE_URI, 
  
)
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log("error occure", err);

  });

module.exports = mongoose.connection;