const User = require("../models/user.model");
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/authUtil");
const catchAsync = require("../utils/catchAsync");

const protectRoute = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(`You are not logged in! Please log in to get access.`, 401)
    );
  }
  // 2. Verification of token
  const decoded = verifyToken(token);
  // 3. Check if user still exists
  const currUser = await User.findById(decoded.id);
  if (!currUser) {
    return next(
      new AppError("The token belonging to this user does no longer exist", 401)
    );
  }

  // Grant access to protected route
  req.user = currUser;
  next();
});

module.exports = {
  protectRoute,
};
