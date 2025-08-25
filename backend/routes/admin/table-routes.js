const express = require("express");
const {
  getAllTable,
  addTable,
  updateTable,
  deleteTable,
  addMenuToTable,
  getTableById,
  removeMenuFromTable,
} = require("../../controllers/admin/tableController");

const router = express.Router();

router.get("/get", getAllTable);
router.post("/add", addTable);
router.put("/update/:id", updateTable);
router.delete("/delete/:id", deleteTable);
router.post("/add-menu", addMenuToTable);
router.get("/get/:id", getTableById);
router.post("/remove-menu", removeMenuFromTable);

module.exports = router;
