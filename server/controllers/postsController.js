const Post = require("../models/Post");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
  console.log("START");

  let image = undefined;
  if (req.files) image = req.files[0].filename;

  const newPost = await Post.create({
    text: req.body.text,
    image,
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
