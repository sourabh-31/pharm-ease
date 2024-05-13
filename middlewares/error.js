const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // validation error
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map(
      (err) => err.message
    );
    err = new ErrorHandler(validationErrors, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
