const path = require("path");

const Token = require("../Controllers/Auth/Token");
const User = require(path.join(__dirname, "../Models/User"));

isGuest = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token != "null") {
    return res.status(401).json({
      success: false,
      message: "user already login",
    });
  } else {
    next();
  }
};

module.exports = isGuest;
