const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please provide a good email"],
  },

  avatar: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
    min: [8, "Please password must be equal to or greater than 8"],
    select: false,
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
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(this.password, saltRounds);

  this.password = hashPassword;
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePassword = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

const User = model("User", userSchema);

module.exports = User;
