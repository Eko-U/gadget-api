const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUsers = catchAsync(async function (req, res, next) {
  const user = await User.find({});

  res.status(404).json({
    status: "success",
    data: user,
  });
});

exports.getUser = catchAsync(async function (req, res, next) {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.status(200).json({
    status: "success",
    data: user,
  });
});
