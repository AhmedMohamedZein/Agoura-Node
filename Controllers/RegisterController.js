const userModel = require("../Models/User");
const validate = require("../Utils/userValidation");
const path = require("path");
const myEmitter = require(path.join(__dirname, "./Events/verifyEvent"));



class RegisterController {
  async register(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    let checkUser = userModel.findOne({ email }).exec();

    if (await checkUser) {
      return res.json({
        success: false,
        message: "user is already exist",
      });
    }

    let newUser = new userModel({
      name,
      email,
      password,
    });

    if (validate(req.body) && password !== confirmPassword) {
      return res.json({
        success: false,
        message: "validation error",
      });
    }
    await newUser.save()
    req.params.id=newUser._id.toString();
    myEmitter.emit('register',req)
    return res.status(201).json({
      success: true,
      message: "please check your email to verify your account.",
    });
  }

}

module.exports = new RegisterController();
