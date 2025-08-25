const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, unique: true },
    seats: { type: Number },
    status: { type: String, default: "available" },
    menu: [
      {
        data: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const tableModel = mongoose.model("Table", TableSchema);

module.exports = tableModel;
