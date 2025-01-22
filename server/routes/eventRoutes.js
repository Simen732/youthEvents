const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const jwtVerify = require("../middleware/jwtVerify");
const {handleEventUpload} = require("../middleware/multerMiddleware");


router.post("/createEvent", jwtVerify, handleEventUpload, eventController.createEvent);
router.post("/leave", jwtVerify,eventController.leaveEvent);
router.post("/join", jwtVerify, eventController.join);
router.post("/addComment", jwtVerify, eventController.addComment);


router.delete("/:eventId", jwtVerify, eventController.deleteEvent);
router.delete("/:eventId/deleteComments/:commentId", jwtVerify, eventController.deleteComments);


router.get("/", eventController.getAllEvents);
router.get("/:eventId", jwtVerify, eventController.getEventById);
router.get("/:eventId/getComments", jwtVerify, eventController.getComments);
router.get("/status", jwtVerify, eventController.getEventStatus);

module.exports = router;
