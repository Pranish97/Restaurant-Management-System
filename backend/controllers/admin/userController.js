const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find();

    res.status(200).json({
      message: "All User",
      data: allUser,
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

const addNewUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, gender, email, role } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      res.status(400).json({
        message: "User Already Exists!",
        error: true,
        success: false,
      });
    }

    const tempPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const addUser = new userModel({
      firstName,
      lastName,
      phone,
      gender,
      email,
      password: hashedPassword,
      role,
    });

    await addUser.save();

    res.status(200).json({
      message: "User Added Successfully!",
      data: addUser,
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, gender, email, role } = req.body;

    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (phone) updateFields.phone = phone;
    if (gender) updateFields.gender = gender;
    if (email) updateFields.email = email;
    if (role) updateFields.role = role;

    const updatedUser = await userModel.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: updatedUser,
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await userModel.findByIdAndDelete(id);

    if (!deleteUser)
      return res.status(404).json({
        message: "User Not Found",
        success: false,
        error: true,
      });

    res.status(200).json({
      message: "User Deleted Successfully!",
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

module.exports = { getAllUser, addNewUser, updateUser, deleteUser };
