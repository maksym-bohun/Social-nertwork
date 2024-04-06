const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const catchAsync = require("../utils/catchAsync");

exports.addMessage = catchAsync(async (req, res, next) => {
  console.log("REQ BODY MESSAGE ", req.body);
  const { sender, receiver, message, chatId } = req.body;
  const chat = await Chat.findById(chatId);

  chat.lastMessage = message;
  const data = await Message.create({
    message,
    users: [sender, receiver],
    chatId,
    sender,
  });

  chat.save();
  await Chat.findByIdAndUpdate(chatId, {
    $push: { messages: data._id },
  });

  if (data) {
    return res.json({ status: "success", msg: "Message added successfully" });
  }
  return req.json({
    status: "fail",
    msg: "Failed to add message to the database",
  });
});
