const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

router.route("/").get(usersController.getAllUsers);
router.route("/:id").get(usersController.getUser);
router.route("/signup").post(authController.signup);

module.exports = router;
