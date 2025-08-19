const express = require("express");
const {
  getAllUser,
  addNewUser,
  deleteUser,
  updateUser,
} = require("../../controllers/admin/userController");

const router = express.Router();

router.get("/allUsers", getAllUser);
router.post("/add", addNewUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
