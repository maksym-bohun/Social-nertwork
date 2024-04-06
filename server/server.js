const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const socket = require("socket.io");
// const messagesController = require("./controllers/messagesController");

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB connection successful!"))
  .catch((err) => console.log("ERROR", err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const io = socket(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("Connection to socket!");

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log("add-user");
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    console.log("send-message✅", data);
    const sendUserSocket = onlineUsers.get(data.to);
    console.log(onlineUsers);
    if (sendUserSocket) {
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", { msg: data.msg, sender: data.from });
    }
  });
});
