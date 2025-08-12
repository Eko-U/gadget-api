const AppError = require("../utils/AppError");

const env = process.env.NODE_ENV;

function handleDuplicateData() {
  const message = "You can't have duplicate data for the title of the product";

  return new AppError(message, 403);
}

function handleCastError(err) {
  const message = `No product found for this item with id: ${err.value}`;

  return new AppError(message, 404);
}

function sendDevError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    err,
  });
}

function prodError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (env === "development") sendDevError(err, res);

  if (env === "production") {
    let error = err;
    error.message = err.message;

    if (err.code === 11000) error = handleDuplicateData(err);
    if (err.name === "CastError") error = handleCastError(err);

    prodError(error, res);
  }
};
