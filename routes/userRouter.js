const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { getUser, getUsers } = require("../controllers/userController");

const router = express.Router();

router.route("/:userId").get(getUser);
router.route("/").get(getUsers);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resetToken").post(resetPassword);

module.exports = router;
