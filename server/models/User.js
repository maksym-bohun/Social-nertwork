const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter the name."] },
  email: {
    type: String,
    required: [true, "Please enter the email."],
    // unique: true,
  },
  password: { type: String, required: [true, "Please enter password."] },
  passwordConfirm: { type: String, required: [true, "Please enter password."] },

  posts: {
    type: [mongoose.Schema.ObjectId],
    ref: "Post",
    default: [],
  },
  passwordChangedAt: { type: Date, default: Date.now() },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
