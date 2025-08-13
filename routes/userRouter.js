const express = require("express");
const { signup, login } = require("../controllers/authController");
const { getUser, getUsers } = require("../controllers/userController");

const router = express.Router();

router.route("/:userId").get(getUser);
router.route("/").get(getUsers);

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
