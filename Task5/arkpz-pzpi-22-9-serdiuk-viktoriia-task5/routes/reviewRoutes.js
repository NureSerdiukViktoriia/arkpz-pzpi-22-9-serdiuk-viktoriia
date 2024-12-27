const express = require("express");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/", userController.authorize(["admin"]), reviewController.createReview);
router.get("/", userController.authorize(["admin", "user"]), reviewController.getAllReviews);
router.put("/:id", userController.authorize(["user"]), reviewController.updateReview);
router.delete("/:id", userController.authorize(["user"]), reviewController.deleteReview);
module.exports = router;
