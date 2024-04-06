const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const userPhotoStorage = require("../utils/userPhotoStorage");

router.route("/").get(usersController.getAllUsers);
router
  .route("/me")
  .get(authController.protect, usersController.getMe, usersController.getUser);
router.route("/:id").get(usersController.getUser);
router
  .route("/editAccount")
  .post(authController.protect, usersController.editUser);
router
  .route("/signup")
  .post(userPhotoStorage.single("avatar"), authController.signup);
router.route("/login").post(authController.login);
router
  .route("/makeFriend/:id")
  .get(authController.protect, usersController.makeFriend);
router
  .route("/unfriend/:id")
  .get(authController.protect, usersController.unfriend);

module.exports = router;
