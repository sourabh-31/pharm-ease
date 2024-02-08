const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");

const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/v1/users", userRouter);

module.exports = app;
