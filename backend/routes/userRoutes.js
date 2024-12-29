const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authCheck,
} = require("../controllers/userController");
const { isAutheticated } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/authcheck").get(isAutheticated, authCheck);

module.exports = router;
