const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/", userController.createUser);
router.post("/login", userController.login);
router.get("/:id", userController.authorize(["admin", "user"]), userController.getUserById);
router.put("/:id", userController.authorize(["admin"]), userController.updateUser);
router.delete("/:id", userController.authorize(["admin"]), userController.deleteUser);
module.exports = router;
