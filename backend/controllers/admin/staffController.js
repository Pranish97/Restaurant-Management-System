const userModel = require("../../models/userModel");

const getAllStaff = async (req, res) => {
  try {
    const allStaff = await userModel.find({ role: "staff" });

    res.status(200).json({
      data: allStaff,
      message: "All Staff",
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

module.exports = { getAllStaff };
