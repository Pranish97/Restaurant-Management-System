const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    price: Number,
    description: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

const menuModel = mongoose.model("Menu", MenuSchema);

module.exports = menuModel;
