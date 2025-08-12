const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  avatar: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
    min: [8, "Please password must be equal to or greater than 8"],
  },

  confirmPassword: {
    type: String,
    required: true,
    min: [8, "Please confirmPassword must be equal to or greater than 8"],
    validate: {
      validator: function (v) {
        return this.password === v;
      },

      message: "confrimPassword is not thesame with Password. Please retype.",
    },
  },

  role: {
    type: String,
    default: "buyer",
    enums: {
      values: ["buyer", "seller", "admin"],
      message: "{VALUE} is not available",
    },
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },

  changedPasswordAt: {
    type: Date,
  },

  passwordResetToken: String,
  passwordResetExpires: Date,

  active: {
    type: Boolean,
    default: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
