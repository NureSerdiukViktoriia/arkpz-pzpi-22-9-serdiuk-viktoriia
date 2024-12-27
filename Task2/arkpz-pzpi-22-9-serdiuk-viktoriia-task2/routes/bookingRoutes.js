const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
module.exports = router;
