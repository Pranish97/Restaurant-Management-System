const express = require("express");
const {
  EsewaInitiatePayment,
  paymentStatus,
  getAllTransaction,
  deleteTransaction,
} = require("../../controllers/admin/payementController");

const router = express.Router();

router.post("/initiate-payment", EsewaInitiatePayment);
router.post("/payment-status", paymentStatus);
router.get("/get", getAllTransaction);
router.delete("/delete/:id", deleteTransaction);

module.exports = router;
