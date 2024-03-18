const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
  const { text } = req.body;
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = Post.find().populate("author").select("name image posts");
  res.status(200).json({ status: "success", data: { posts } });
});
