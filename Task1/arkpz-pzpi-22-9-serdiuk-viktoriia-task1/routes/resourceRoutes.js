const express = require("express");
const resourceController = require("../controllers/resourceController");
const router = express.Router();
router.post("/", resourceController.createResource);
router.get("/", resourceController.getAllResources);
router.put("/:id", resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);
module.exports = router;
