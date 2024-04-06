const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const { promisify } = require("util");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    data: { user, token, tokenExpires: cookieOptions.expires },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
    avatar: req.body.avatar || undefined,
    shortInfo: req.body.shortInfo,
  });

  console.log("NEW USER ", newUser);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  console.log("START LOGIN");
  const { email, password } = req.body;
  let currentUser = undefined;
  console.log("email, password ", req.body);

  if (!password || !email)
    return next(
      new AppError(
        "Please provide your phone number or email and password!",
        400
      )
    );

  currentUser = await User.findOne({ email });
  console.log("current user ", currentUser);
  if (
    !currentUser ||
    !(await currentUser.correctPassword(password, currentUser.password))
  ) {
    return next(new AppError("Incorrect email or password!", 400));
  }

  createSendToken(currentUser, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user beloning to this token does not longer exists! Please sign up again!",
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    next(
      new AppError(
        "User recently changed the password. Please log in again!",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});
