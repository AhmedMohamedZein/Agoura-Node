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
  }
};

module.exports = isUser;
