const path = require("path");

const Token = require("../Controllers/Auth/Token");
const User = require(path.join(__dirname, "../Models/User"));

isUser = async (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (token) {
    user = Token.verifyToken(token);

    if (user) {
      let userData = await User.findOne({ email: user.email });
      userData = userData.toObject();
      delete userData["password"];
      req.user = userData;
      next();
    }
    return res.status(401).json({
      succes: false,
      message: "user not exist",
    });
  }

  return res.status(401).json({
    succes: false,
    message: "Token not found",
  });
};

module.exports = isUser;
