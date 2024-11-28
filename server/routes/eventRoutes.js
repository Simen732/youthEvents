const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const jwtVerify = require("../middleware/jwtVerify");
const multerMiddleware = require("../middleware/multerMiddleware");

router.post("/join", jwtVerify, eventController.join);
router.post("/createEvent", jwtVerify, eventController.createEvent)


module.exports = router;
