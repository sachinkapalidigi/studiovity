const http = require("http");
const dotenv = require("dotenv");
const path = require("path");

// Load this before importing app
dotenv.config({
  path: path.join(__dirname, "../.env"),
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message); // send to chat maybe
  console.log("UNCAUGHT EXCEPTION! Shutting down...!");
  console.log(err.stack);
  process.exit(1);
});

// Import app
const app = require("./app");
const { mongoConnect } = require("./configs/mongo");

// Add path to certs for https
const server = http.createServer(app);

const { PORT = "8080" } = process.env;
async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
}

startServer();

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message); // send to chat maybe
  console.log(err.stack);
  console.log("UNHANDLED REJECTION! Shutting down...!");

  // Graceful shutdown: give time for server to handle all pending requests before shutting down
  server.close(() => {
    process.exit(1);
  });
});

// Restart the server if shutdown occurs when process is exited. Provided by most hosting services.
