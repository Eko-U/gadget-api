const Product = require("../models/productModel");

exports.getCarts = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.createCart = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.updateCart = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.deleteCart = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

/** FOR ADMIN */

exports.getAllCarts = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.clearAllCarts = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};
