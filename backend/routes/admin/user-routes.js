const express = require("express");
const {
  getAllUser,
  addNewUser,
  deleteUser,
  updateUser,
  inviteUser,
  resetPassword,
} = require("../../controllers/admin/userController");

const router = express.Router();

router.get("/allUsers", getAllUser);
router.post("/add", addNewUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/invite/:id", inviteUser);
router.post("/reset-password/:id", resetPassword);

module.exports = router;
