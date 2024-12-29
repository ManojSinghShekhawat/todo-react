const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncError");
const sendToken = require("../utils/jwtToken");

//register a user
const registerUser = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
  });
  sendToken(newUser, 201, res);
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //check if email and
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter eamil and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Please Enter eamil and Password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Please Enter eamil and Password", 401));
  }
  sendToken(user, 200, res);
});

const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});

//auth check

const authCheck = asyncErrorHandler(async (req, res, next) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

module.exports = { registerUser, loginUser, logoutUser, authCheck };
