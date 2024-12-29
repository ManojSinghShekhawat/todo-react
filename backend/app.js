const express = require("express");
const cors = require("cors");
const app = express();
const todoRoute = require("./routes/todoRoutes");
const userRoute = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/v1", todoRoute);
app.use("/api/v1/user", userRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(errorMiddleware);

module.exports = app;
