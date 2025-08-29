const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    transaction_uuid: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: { type: String, required: true },
    customerNumber: { type: String, required: true },
    customerAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;
