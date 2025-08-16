const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(new AppError("Please try to login again. Thank you", 403));

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user) return next(new AppError("User not found", 404));

  req.user = user;
  next();
});

exports.forgotPassword = catchAsync(async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(
      new AppError(
        "User not found. Please input the correct email address of your account ",
        404,
      ),
    );

  const token = crypto.randomBytes(32).toString("hex");
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  user.passwordResetToken = hashToken;
  user.passwordResetExpires = Date.now() + 60 * 10 * 1000;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Sent URL to your mail",
    URL: `127.0.0.1:5000/api/v1/users/resetPassword/token=${token}`,
  });
});

exports.resetPassword = catchAsync(async function (req, res, next) {
  const { resetToken } = req.params;
  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({ passwordResetToken: hashToken });

  if (!user) return next(new AppError("You can't reset your password", 403));

  if (user.passwordResetExpires > Date.now()) {
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    user.save({ validateBeforeSave: true });
  }

  res.status(200).json({
    status: "successs",
    data: user,
  });
});

exports.updatePassword = catchAsync(async function (req, res, next) {
  const user = await User.findById(req.user._id).select("+password");

  const currentPassword = user.password;

  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const isCorrect = await bcrypt.compare(currentPassword, user.password);

  if (!isCorrect) return new AppError("You cannot update your password");

  user.password = password;
  user.confirmPassword = confirmPassword;

  await User.save();

  res.status(200).json({
    status: "success",
    message: "updated successfully",
  });
});
