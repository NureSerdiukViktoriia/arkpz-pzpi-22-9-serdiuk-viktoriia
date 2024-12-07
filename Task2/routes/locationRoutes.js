const express = require("express");
const locationController = require("../controllers/locationController");
const router = express.Router();
router.post("/", locationController.createLocation);
router.get("/", locationController.getAllLocations);
router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);
module.exports = router;
