const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    seats: {
      type: Number,
      default: 4,
    },
    status: {
      type: String,
      default: "available",
    },
    menu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const tableModel = mongoose.model("Table", TableSchema);

module.exports = tableModel;
