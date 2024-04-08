const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notificationModel");

const removeNotification = async (post, req) => {
  const user = await User.findById(post.author).populate({
    path: "notifications",
    select: "sender type post",
  });

  const currentPost = await Post.findById(post._id).populate().select("author");

  const notification = user.notifications.find((item) => {
    console.log(item.sender.toString() === req.user._id.toString());
    console.log(currentPost.author.toString() === req.user._id.toString());
    return (
      item.sender.toString() === req.user._id.toString() ||
      currentPost.author.toString() === req.user._id.toString()
    );
  });
  user.notifications = user.notifications.filter(
    (item) => item._id !== notification._id
  );
  await Notification.findByIdAndRemove(notification._id);
  user.save();
  return true;
};

exports.createPost = catchAsync(async (req, res, next) => {
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
  const posts = await Post.find().populate({
    path: "author",
    select: "name avatar posts",
  });
  res.status(200).json({ status: "success", posts });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post.likes.includes(req.user._id)) {
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: req.user._id },
    });
    const newNotification = await Notification.create({
      sender: req.user._id,
      type: "like",
      post,
    });
    await User.findByIdAndUpdate(post.author, {
      $push: { notifications: newNotification },
    });
  }
  res.status(200).json({
    status: "success",
  });
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findByIdAndUpdate(postId, {
    $pull: { likes: req.user._id },
  });
  await removeNotification(post, req);

  res.status(200).json({
    status: "success",
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const postId = req.params.id;
  const comment = await Comment.create({ text, author: req.user._id });
  await comment
    .populate({ path: "author", select: "name avatar shortInfo" })
    .execPopulate();

  const post = await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment },
  });
  const newNotification = await Notification.create({
    sender: req.user._id,
    type: "comment",
    post,
  });
  await User.findByIdAndUpdate(post.author, {
    $push: { notifications: newNotification },
  });
  res.status(200).json({
    status: "success",
    comment,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.postId, {
    $pull: { comments: req.params.commentId },
  });
  await removeNotification(post, req);
  await Comment.findByIdAndRemove(req.params.commentId);
  res.status(200).json({ status: "success" });
});

exports.getGroupOfComments = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  console.log("postId ", postId);
  const post = await Post.findById(postId);
  const comments = post.comments;
  const result = [];

  for (const commentId of comments) {
    const currentComment = await Comment.findById(commentId).populate({
      path: "author",
      select: "name avatar shortInfo",
    });
    console.log("currentComment ", currentComment);
    result.push(currentComment);
  }

  res.status(200).json({
    status: "success",
    comments: result,
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const data = await User.findById(userId).populate({
    path: "notifications",
    populate: [
      {
        path: "post",
      },
      {
        path: "sender",
        select: "name avatar",
      },
    ],
  });

  res
    .status(200)
    .json({ status: "success", notifications: data.notifications });
});
