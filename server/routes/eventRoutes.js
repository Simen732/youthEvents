const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const jwtVerify = require("../middleware/jwtVerify");
const {handleEventUpload} = require("../middleware/multerMiddleware");

router.use(jwtVerify)

router.post("/join", jwtVerify, eventController.join);
router.post("/createEvent", jwtVerify, handleEventUpload, eventController.createEvent)


module.exports = router;
