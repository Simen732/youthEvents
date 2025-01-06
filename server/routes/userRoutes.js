const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtVerify = require('../middleware/jwtVerify');

router.get('/events', jwtVerify, userController.getUserEvents);

module.exports = router;
