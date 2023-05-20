const path = require("path");

const Token = require("../Controllers/Auth/Token");
const User = require(path.join(__dirname, "../Models/User"));

isUser = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    user = Token.verifyToken(token);
    console.log(user);

    if (user.email) {
      let userData = await User.findOne({ email: user.email });
      console.log(typeof user.email);

      userData = handleData(userData);
      req.user = userData;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "user not exist",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }
};

function handleData(data) {
  data = data.toObject();
  delete data["password"];

  return data;
}

module.exports = isUser;
