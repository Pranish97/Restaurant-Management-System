const express = require("express");
const { getAllStaff } = require("../../controllers/admin/staffController");

const router = express.Router();

router.get("/get", getAllStaff);

module.exports = router;
