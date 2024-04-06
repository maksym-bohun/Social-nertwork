const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add text!"],
      // minlength: [5, "Text should have at least 5 letters."],
    },
    image: {
      type: String,
      default:
        "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
    },
    likes: { type: [mongoose.Schema.ObjectId], ref: "User", default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
