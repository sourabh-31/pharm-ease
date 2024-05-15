const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const medicineRouter = require("./routes/medicineRoutes");
const groupRouter = require("./routes/groupsRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const customerRouter = require("./routes/customerRoutes");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/invoice", invoiceRouter);
app.use("/api/v1/medicine", medicineRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/customer", customerRouter);

//using error middleware
app.use(errorMiddleware);

module.exports = app;
