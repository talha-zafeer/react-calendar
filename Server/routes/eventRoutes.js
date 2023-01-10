const { Router } = require("express");
const router = Router();
const eventController = require("../controllers/eventControllers");

router.get("/", eventController.displayEvents);
router.get("/create", eventController.createGet);
router.get("/create-all-day-event", eventController.get_createAllDayEvent);
router.post("/create", eventController.createPost);
router.post("/create-all-day-event", eventController.post_createAllDayEvent);
router.put("/update", eventController.updateEvent);
router.put("/updateAllDayEvent", eventController.updateAllDayEvent);
router.delete("/deleteAllDayEvent/:id", eventController.eventAllDayDelete);
router.delete("/delete/:id", eventController.eventDelete);

module.exports = router;
