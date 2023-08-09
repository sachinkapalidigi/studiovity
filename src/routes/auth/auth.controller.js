const User = require("../../models/user.model");
const {
  hashPassword,
  generateToken,
  verifyPassword,
} = require("../../utils/authUtil");
const catchAsync = require("../../utils/catchAsync");

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, // https only
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  // Remove password to send back
  res.status(statusCode).json({
    status: "success",
    data: {}, // SEND user info if needed
    token, // Send token in AUTH header as an alternative
  });
  return;
};

const httpCreateUser = catchAsync(async (req, res) => {
  const { email, name, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password: hashPassword(password),
  });
  createSendToken(newUser, 201, res);
  return;
});

const httpLoginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if user exists & password is correct
  const user = await User.findOne({ email }).select("+password"); // since selecting password is off
  if (!user || !verifyPassword(password, user.password)) {
    return next(new AppError(`Invalid email or password`, 401));
    // throw new AppError(`Invalid email or password`, 401); // this works as well.
  }
  // 2. IF everything is ok, send token to client
  createSendToken(user, 200, res);
  return;
});

module.exports = {
  httpCreateUser,
  httpLoginUser,
};
