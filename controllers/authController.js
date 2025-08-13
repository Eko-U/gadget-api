const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");

exports.signup = catchAsync(async function (req, res, next) {
  const user = await User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  });

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Account successfully created",
    data: user,
  });
});

exports.login = catchAsync(async function (req, res, next) {
  if (!req.body.email || !req.body.password)
    return next(
      new AppError(
        `Please you must insert your email or password to login. Thanks`,
        403,
      ),
    );

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user)
    return next(new AppError(`User not found for this ${req.body.email}`, 404));

  const isCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isCorrect)
    return next(
      new AppError("Your password is incorrect. Please try again", 403),
    );

  res.status(200).json({
    status: "success",
    message: "Successfully logged in.",
  });
});
