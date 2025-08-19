exports.getCartItems = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.createCartItem = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.updateCartItem = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.deleteCartItem = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};

exports.deleteAllCartItem = async function (req, res, next) {
  const product = await Product({});
  product.save();

  res.status(200).json({
    status: "success",
  });
};
