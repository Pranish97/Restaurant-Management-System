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

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return res.json({
        message: "User Already Exists",
        success: false,
        error: true,
      });
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return res.json({
        message: "Invalid Credentials!",
        success: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.json({
        message: "Invalid Credentials!",
        success: false,
        error: true,
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      error: false,
      message: "User Logged In Successfully!!",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully!",
    error: false,
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      message: "Unauthorized User!",
      success: false,
      error: true,
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
