const app = require("./app");
const connectDB = require("./data/database");
const dotenv = require("dotenv");

//config
dotenv.config({
  path: "data/config.env",
});

//connect to the database
connectDB();

//Server listening port
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT}`);
});

//Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error:${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// });

//unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to unhandled promise rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });
