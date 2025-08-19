const multer = require("multer");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const supabase = require("../supabase");

exports.getAllProducts = catchAsync(async function (req, res, next) {
  const products = await Product.find({});

  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
});

/** UPLOAD OF PRODUCT IMAGE */

const storage = multer.memoryStorage();
const upload = multer({ storage });
exports.uploadProductPhoto = upload.single("image_url");

exports.createProduct = catchAsync(async function (req, res, next) {
  const filename = `${Date.now()}-${Math.random()}-${req.file.originalname}`;

  const productImage = req.file.buffer;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(filename, productImage, {
      contentType: req.file.mimetype,
      upsert: false,
    });

  if (error) return next(new AppError("Product image could not upload", 500));

  const { data: publicUrl } = supabase.storage
    .from("products")
    .getPublicUrl(filename);

  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: publicUrl.publicUrl,
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

    { new: true },
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

exports.restrictTo = (...roles) =>
  function (req, res, next) {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You can't create a product try become a selle", 403),
      );

    next();
  };
