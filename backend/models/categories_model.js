const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  description: { type: String, default: "", trim: true },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Category",categorySchema);