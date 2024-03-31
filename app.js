const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");
const medicineRouter = require("./routes/medicineRoutes");
const groupRouter = require("./routes/groupsRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const errorMiddleware = require("./middlewares/error");

const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/invoice", invoiceRouter);

app.use(errorMiddleware);

app.use("/api/v1/inventory", inventoryRouter)

app.use("/api/v1/medicine", medicineRouter)

app.use("/api/v1/groups", groupRouter)

module.exports = app;
