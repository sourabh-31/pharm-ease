const jwt = require("jsonwebtoken");

const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: null,
    })
    .json({
      success: true,
      message,
    });
};

module.exports = sendCookie;
