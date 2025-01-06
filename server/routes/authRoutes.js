const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwtVerify = require('../middleware/jwtVerify');


router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/status', jwtVerify, authController.status);
router.post('/logout', jwtVerify, authController.logout);

module.exports = router;