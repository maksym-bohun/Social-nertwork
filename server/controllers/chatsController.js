const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const catchAsync = require("../utils/catchAsync");

exports.createChat = catchAsync(async (req, res, next) => {
  const sender = await User.findById(req.body.sender);
  const receiver = await User.findById(req.body.receiver);

  const newChat = await Chat.create({
    users: [sender, receiver],
    lastMessage: "",
  });

  await User.findByIdAndUpdate(req.body.sender, {
    $push: { chats: newChat._id },
  });
  await User.findByIdAndUpdate(req.body.receiver, {
    $push: { chats: newChat._id },
  });
  res.status(200).json({ status: "success", chat: newChat });
});

exports.getChat = catchAsync(async (req, res, next) => {
  const chatId = req.params.chatId;
  const chat = await Chat.findById(chatId);
  res.status(200).json({ status: "success", chat });
});

exports.checkChat = catchAsync(async (req, res, next) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const chat = await Chat.findOne({
    $or: [{ users: [sender, receiver] }, { users: [receiver, sender] }],
  })
    .populate("users")
    .populate("messages");

  if (!chat) {
    console.log("CHAT WAS NOT FOUND");
    return res.status(200).json({ status: "fail" });
  } else {
    console.log("CHAT WAS FOUND");
    return res.status(200).json({ status: "success", chat });
  }
});

exports.updateChat = catchAsync(async (req, res, next) => {
  const chatId = req.params.chatId;
  const chatData = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(chatId, chatData, {
    new: true,
  });
  if (!updatedChat) {
    return res.status(404).json({ error: "Chat not found" });
  }
  res.json({ status: "success", updatedChat });
});

exports.getUsersChats = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const chats = await User.findById(userId)
    .select("chats")
    .populate({
      path: "chats",
      populate: [{ path: "users" }, { path: "messages" }],
    });

  res.json({ status: "success", chats });
});
