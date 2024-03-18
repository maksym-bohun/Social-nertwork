const express = require("express");
const hpp = require("hpp");
const usersRouter = require("./routes/usersRoutes");
const postsRouter = require("./routes/postsRoutes");
// const chatsRouter = require("./routes/chatsRoutes");
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
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you are using cookies or sessions
};

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(cors());
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

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", jsonParser, usersRouter);
app.use("/api/v1/posts", jsonParser, postsRouter);
// app.use("/api/v1/chats", jsonParser, chatsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
