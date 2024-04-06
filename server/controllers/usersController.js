const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate({
      path: "posts",
      populate: {
        path: "author", // Путь к полю 'author' в каждом объекте 'posts'
        model: "User", // Модель, на которую ссылается поле 'author' в объекте 'posts'
      },
    })
    .populate("friends");

  if (!user) return next(new AppError("You are not authorized!"));
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.editUser = catchAsync(async (req, res, next) => {
  console.log("currentUser");
  const currentUser = await User.findById(req.user._id);

  const { avatar, name, shortInfo } = req.body;

  if (avatar) currentUser.avatar = avatar;
  if (name) currentUser.name = name;
  if (shortInfo) currentUser.shortInfo = shortInfo;

  currentUser.save({ validateBeforeSave: false });
  res.status(200).json({ status: "success", user: currentUser });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .select("name avatar posts friends shortInfo")
    .populate({
      path: "posts",
      populate: {
        path: "author", // Путь к полю 'author' в каждом объекте 'posts'
        model: "User", // Модель, на которую ссылается поле 'author' в объекте 'posts'
      },
    })
    .populate("friends");

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.makeFriend = catchAsync(async (req, res, next) => {
  const userToFriendId = req.params.id;
  await User.findByIdAndUpdate(userToFriendId, {
    $push: { friends: req.user._id },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: { friends: userToFriendId },
  });

  console.log("MAKE FRIEND");

  res.status(200).json({ status: "success" });
});

exports.unfriend = catchAsync(async (req, res, next) => {
  const friendIdToRemove = req.params.id;

  // Удаление друга из списка друзей у пользователя
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { friends: friendIdToRemove },
  });

  // Удаление текущего пользователя из списка друзей у другого пользователя
  await User.findByIdAndUpdate(friendIdToRemove, {
    $pull: { friends: req.user._id },
  });

  console.log("UNFRIEND");

  res.status(200).json({ status: "success" });
});
