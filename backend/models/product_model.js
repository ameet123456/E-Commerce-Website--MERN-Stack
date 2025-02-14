const mongoose = require("mongoose");
const Category = require("./categories_model");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    quanaity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    img: {
      type: [String],
      default: [],
        
    },
    bgcolor: {
      type: String,
      default: "#ffffff",
    },
    txtcolor: {
      type: String,
      default: "#000000",
    },
    panelcolor: {
      type: String,
      default: "#f4f4f4",
    },
    category: {
     
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
