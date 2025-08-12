const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT;

mongoose
  .connect(process.env.DATABASE_STRING)
  .then(() => console.log("Database connected successfully "));

app.listen(port, () => console.log(`running on port ${port}`));
