const path = require("path");

const Token = require("../Controllers/Auth/Token");
const User = require(path.join(__dirname, "../Models/User"));

isVerified = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    user = Token.verifyToken(token);
    if (user.email) {
      let userData = await User.findOne({ email: user.email });
      if (userData.isVerified) next();
      else {
        return res.status(400).json({
          success: false,
          message: "user email not verified",
        });
      }
    } else {
      return res.status(400).json({
        succes: false,
        message: "user not exist",
      });
    }
  } else {
    return res.status(400).json({
      succes: false,
      message: "Token not found",
    });
  }
};

module.exports = isVerified;
