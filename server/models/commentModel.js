const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
