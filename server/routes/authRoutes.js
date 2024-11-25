const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { rateLimit } = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5, 
    message: { msg: "Too many login attempts, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
});



router.post("/login",loginLimiter, authController.login)
router.post("/signup", authController.signup)

module.exports = router;