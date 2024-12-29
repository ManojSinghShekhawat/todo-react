const app = require("./app");
require("dotenv").config({ path: "./backend/config/config.env" });

const connectDB = require("./config/connectDB");

//handling uncaught error

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server");
  process.exit(1);
});

connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is live at port ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
