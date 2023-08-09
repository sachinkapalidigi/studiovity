const mongoose = require("mongoose");

const DATABASE = process.env.DATABASE || "";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
const DB = DATABASE.replace("<PASSWORD>", DATABASE_PASSWORD);

const mongooseConnection = mongoose.connection;

mongooseConnection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongooseConnection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(DB);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect, mongooseConnection };
