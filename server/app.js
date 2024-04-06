const express = require("express");
const hpp = require("hpp");
const usersRouter = require("./routes/usersRoutes");
const postsRouter = require("./routes/postsRoutes");
const chatsRouter = require("./routes/chatsRoutes");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var bodyParser = require("body-parser");
const AppError = require("./utils/appError");

const app = express();

var jsonParser = bodyParser.json();

app.set("view engine", "ejs");

const allowedOrigins = ["www.example1.com", "www.example2.com"];

app.use(bodyParser.json({ limit: "20mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Разрешаем доступ с указанного домена
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Разрешаем передачу учетных данных
  next();
});

app.use(
  hpp({
    whitelist: ["price", "ratingsAverage"],
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", jsonParser, usersRouter);
app.use("/api/v1/posts", jsonParser, postsRouter);
app.use("/api/v1/chats", jsonParser, chatsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
