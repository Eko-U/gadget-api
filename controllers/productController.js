const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async function (req, res, next) {
  const products = await Product.find({});

  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
});

exports.createProduct = catchAsync(async function (req, res, next) {
  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.getProduct = catchAsync(async function (req, res, next) {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.updateProduct = catchAsync(async function (req, res, next) {
  const { productId } = req.params;

  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      title: req.body.title,
      price: req.body.price,
    },
  );

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async function (req, res, next) {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);

  res.status(200).json({
    status: "success",
    message: "Succefully deleted the product",
  });
});
