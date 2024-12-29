const express = require("express");
const cors = require("cors");
const app = express();
const todoRoute = require("./routes/todoRoutes");
const userRoute = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1", todoRoute);
app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

module.exports = app;
