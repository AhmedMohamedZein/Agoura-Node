const userModel = require("../Models/User");
const userValidation = require("../Utils/userValidation");
const validate = require("../Utils/userValidation");
const loginValidation = require("./Utils/loginValidation");

class AuthController {
  async register(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    let newUser = new userModel({
      name,
      email,
      password,
    });

    if (validate(req.body) && password === confirmPassword) {
      await newUser
        .save()
        .then((user) => {
          return res.json({
            success: true,
            message: "user added successfully",
          });
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: "There is an error",
            error: err.message,
          });
        });
    } else
      return res.json({
        success: false,
        message: "validation error",
      });
  }

  login() {}

  //check email user return true if valid else"invalid data"
  vlidateUserInput() {
    validation = loginValidation.validate(loginSchema, req.body);
    if (validation) {
      return true;
    } else {
      res.json("Invalid Data");
    }
  }

  // check user email in db
  checkEmail() {
    return userModel.findOne({ email: req.body.email }).exec();
  }

  //check password
  checkPassword(foundedUser) {
    if (req.body.password === foundedUser.password) {
      return true;
    }
  }

  // async function getUserByEmail(email) {
  //   const user = await User.findOne({ email });
  //   return user;
  // }
}

module.exports = new AuthController();
