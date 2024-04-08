const express = require("express");
const postsController = require("../controllers/postsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(authController.protect, postsController.createPost);

router
  .route("/like/:id")
  .post(authController.protect, postsController.likePost);
router
  .route("/dislike/:id")
  .post(authController.protect, postsController.unlikePost);
router
  .route("/addComment/:id")
  .post(authController.protect, postsController.addComment);
router
  .route("/deleteComment/:postId/:commentId")
  .get(authController.protect, postsController.deleteComment);
router.route("/getComments/:id").get(postsController.getGroupOfComments);

module.exports = router;
