const express = require("express");
const router = express.Router();

const { signup, login, redeemPoints } = require("../controllers/authController");
router.post("/signup", signup);
router.post("/login", login);
router.post("/redeem", redeemPoints);

module.exports = router;