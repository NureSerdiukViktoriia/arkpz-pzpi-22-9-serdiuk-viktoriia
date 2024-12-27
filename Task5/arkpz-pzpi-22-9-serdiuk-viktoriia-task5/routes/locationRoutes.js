const express = require("express");
const locationController = require("../controllers/locationController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/", userController.authorize(["admin"]), locationController.createLocation);
router.get("/", userController.authorize(["admin", "user"]), locationController.getAllLocations);
router.put("/:id", userController.authorize(["admin"]), locationController.updateLocation);
router.delete("/:id", userController.authorize(["admin"]), locationController.deleteLocation);
module.exports = router;
