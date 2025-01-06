const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const jwtVerify = require("../middleware/jwtVerify");
const {handleEventUpload} = require("../middleware/multerMiddleware");


router.post("/createEvent", jwtVerify, handleEventUpload, eventController.createEvent);
router.post("/leave", jwtVerify,eventController.leaveEvent);
router.post("/join", jwtVerify, eventController.join);

router.delete("/:eventId", jwtVerify, eventController.deleteEvent);

router.get("/", eventController.getAllEvents);
router.get("/:eventId", jwtVerify, eventController.getEventById);
router.get("/status", jwtVerify, eventController.getEventStatus);

module.exports = router;
