const express = require("express");
const morgan = require("morgan");

const cartRoutes = require("./routes/cartRouter");
const orderRoutes = require("./routes/orderRouter");
const productRoutes = require("./routes/productRouter");
const userRoutes = require("./routes/userRouter");

const globalErrors = require("./controllers/errorController");

const app = express();

app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

app.use(globalErrors);

module.exports = app;
