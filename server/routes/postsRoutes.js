const express = require("express");
const postsController = require("../controllers/postsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(authController.protect, postsController.createPost);

module.exports = router;
