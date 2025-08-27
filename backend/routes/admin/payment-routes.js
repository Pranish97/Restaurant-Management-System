const express = require("express");
const {
  EsewaInitiatePayment,
  paymentStatus,
} = require("../../controllers/admin/payementController");

const router = express.Router();

router.post("/initiate-payment", EsewaInitiatePayment);
router.post("/payment-status", paymentStatus);

module.exports = router;
