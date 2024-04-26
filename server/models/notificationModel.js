const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    type: { type: String, enum: ["like", "comment"] },
    post: { type: mongoose.Schema.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
