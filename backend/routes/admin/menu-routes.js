const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
  handleImageUpload,
  addMenu,
  editMenu,
  deleteMenu,
  fetchMenuByCategory,
} = require("../../controllers/admin/menuController");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addMenu);
router.put("/update/:id", editMenu);
router.get("/getByCategory", fetchMenuByCategory);
router.delete("/delete/:id", deleteMenu);

module.exports = router;
