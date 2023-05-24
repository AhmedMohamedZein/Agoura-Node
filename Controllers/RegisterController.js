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

    if (validate(req.body) && password === confirmPassword) {
      await newUser
        .save()
        .then((user) => {
         
          //emit my event
          myEmitter.emit('register',newUser.id,res)
        //   return res.json({
        //     success: true,
        //     message: "user added successfully",
        //   });
        // })
        }).catch((err) => {
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

}

module.exports = new RegisterController();
