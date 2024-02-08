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
