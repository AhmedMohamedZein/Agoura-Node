const userModel = require("../Models/User");
const validate = require("../Utils/userValidation");

class AuthController {
  register(req, res) {
    name = req.body.name;
    email = req.body.email;
    password = req.body.password;
    confirmPassword = req.body.confirmPassword;

    let newUser = new userModel({
      name,
      email,
      password,
    });

    if (validate(req.body) && password === confirmPassword) {
      newUser
        .save()
        .then((user) => {
          return res.json({
            success: true,
            message: "user added successfully",
            user: newUser,
          });
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: "There is an error",
          });
        });
    }

    return res.json({
      success: false,
      message: "validation error",
    });
  }
}

module.exports = new AuthController();
