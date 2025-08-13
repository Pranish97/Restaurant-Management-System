const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, gender, email, password } = req.body;

    if (!firstName) {
      throw new Error("First Name is Required");
    }
    if (!lastName) {
      throw new Error("Last Name is Required");
    }
    if (!phone) {
      throw new Error("Phone Number is Required");
    }
    if (!gender) {
      throw new Error("Gender is Required");
    }
    if (!email) {
      throw new Error("Email is Required");
    }
    if (!password) {
      throw new Error("Password is Required");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      firstName,
      lastName,
      phone,
      gender,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "User Register Successfully!",
      data: newUser,
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = { registerUser, login };
