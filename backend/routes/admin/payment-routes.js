const express = require("express");
const {
  EsewaInitiatePayment,
  paymentStatus,
  getAllTransaction,
} = require("../../controllers/admin/payementController");

const router = express.Router();

router.post("/initiate-payment", EsewaInitiatePayment);
router.post("/payment-status", paymentStatus);
router.get("/get", getAllTransaction);

module.exports = router;
