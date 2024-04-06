const Post = require("../models/postModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
  console.log("START");
  console.log("req.body");

  const newPost = await Post.create({
    text: req.body.text,
    image: req.body.image,
  });

  newPost.author = req.user._id;
  newPost.save();

  await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: newPost._id },
  });

  res.status(201).json({ status: "success", data: { post: newPost } });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = Post.find().populate("author").select("name image posts");
  res.status(200).json({ status: "success", data: { posts } });
});

exports.likePost = catchAsync(async (req, res, next) => {
  console.log("LIKE POST");
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post.likes.includes(req.user._id)) {
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: req.user._id },
    });
  }
  res.status(200).json({
    status: "success",
  });
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  console.log("UNLIKE");
  const postId = req.params.id;
  await Post.findByIdAndUpdate(postId, {
    $pull: { likes: req.user._id },
  });
  res.status(200).json({
    status: "success",
  });
});
