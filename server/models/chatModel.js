const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      required: [true, "Please provide sender id!"],
    },
    lastMessage: { type: String, default: "" },
    messages: { type: [mongoose.Schema.ObjectId], ref: "Message" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
