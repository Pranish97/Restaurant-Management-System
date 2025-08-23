const { imageUploadUtil } = require("../../helpers/cloudinary");
const menuModel = require("../../models/menuModel");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const addMenu = async (req, res) => {
  try {
    const { image, name, price, description, category } = req.body;

    const newMenu = await menuModel({
      image,
      name,
      price,
      description,
      category,
    });

    await newMenu.save();

    res.status(200).json({
      message: "Menu Added Successfully!",
      data: newMenu,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const editMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const { image, name, price, description, category } = req.body;

    const findMenu = await menuModel.findByIdAndUpdate(id);

    if (!findMenu)
      return res.status(404).json({
        message: "Menu Not Found",
        success: false,
        error: true,
      });

    findMenu.name = name || findMenu.name;
    findMenu.price = price || findMenu.price;
    findMenu.description = description || findMenu.description;
    findMenu.category = category || findMenu.category;
    findMenu.image = image || findMenu.image;

    await findMenu.save();

    res.status(200).json({
      message: "Menu Updated Successfully!",
      success: true,
      error: false,
      data: findMenu,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const fetchMenuByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const menu = await menuModel.find(query);

    res.status(200).json({
      data: menu,
      message: "Menu fetched successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const fetchAllMenu = async (req, res) => {
  try {
    const menuList = await menuModel.find();

    res.status(200).json({
      message: "All Menu",
      data: menuList,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMenu = await menuModel.findByIdAndDelete(id);

    if (!deleteMenu)
      return res.status(404).json({
        message: "Menu Not Found",
        success: false,
        error: true,
      });

    res.status(200).json({
      message: "Menu Removed Successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = {
  handleImageUpload,
  addMenu,
  editMenu,
  fetchMenuByCategory,
  deleteMenu,
  fetchAllMenu,
};
