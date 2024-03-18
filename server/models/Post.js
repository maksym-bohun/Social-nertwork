const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Please add text!"],
    minlength: [5, "Text should have at least 5 letters."],
  },
  image: {
    type: String,
    default: "user.webp",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
