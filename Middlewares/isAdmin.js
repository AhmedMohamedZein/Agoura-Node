const path = require("path");

const Token = require("../Controllers/Auth/Token");
const User = require(path.join(__dirname, "../Models/User"));

isAdmin = async (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (token) {
    user = Token.verifyToken(token);

    if (user) {
      let userData = await User.findOne({ email: user.email });
      userData = handleData(userData);

      if (userData.isAdmin) {
        req.user = userData;
        next();
      } else {
        return res.status(403).json({
          succes: false,
          message: "user does't have the required privilages",
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

function handleData(data) {
  data = data.toObject();
  delete data["password"];

  return data;
}

module.exports = isAdmin;
