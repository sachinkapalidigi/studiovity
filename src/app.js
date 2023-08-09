const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiV1 = require("./routes/api.v1");
const AppError = require("./utils/appError");
const path = require("path");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const { rateLimit } = require("express-rate-limit");
const ExpressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean"); // NOTE: xss-clean doesn't have type bindings.

const ip = require("./middlewares/extractIp");

const app = express();

// TODO: Add only specific site to cors
app.use(cors());

// 1. Global middlewares
// Set security http headers.
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
// if app restarts then it will go back to 100
const limiter = rateLimit({
  max: 100, // 100 requests per window which is 1 hour here. TODO: Increae if needed.
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use(ip);
app.use(limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb", // max request body size
  })
);

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize()); // remove query syntax from body

// Data sanitization against XSS
app.use(xss()); // malicious html code with js code

// Prevent parameter pollution
// app.use(hpp()); // By default: prevents all parameter pollution, whitelist in apis if necessary

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", apiV1);

app.all("*", (req, res, next) => {
  // if arg passed to next it will assume there was an error
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
