const express = require("express");
const {
  getAllTable,
  addTable,
  updateTable,
  deleteTable,
} = require("../../controllers/admin/tableController");

const router = express.Router();

router.get("/get", getAllTable);
router.post("/add", addTable);
router.put("/update/:id", updateTable);
router.delete("/delete/:id", deleteTable);

module.exports = router;
