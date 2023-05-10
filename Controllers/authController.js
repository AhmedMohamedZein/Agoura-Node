const userModel = require("../Models/User");
const validate = require("../Utils/userValidation");
const LoginStrategy = require('./Auth/LoginStrategy');
const LoginFactory = require('./Auth/LoginFactory');


class AuthController {
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

  login = async (req, res)=> {

    const logMeIn = LoginFactory.createLoginObject(req.path); // googleObject.login
    const loginStrategy = new LoginStrategy (logMeIn);
    const loginResult = await loginStrategy.execute(req.body); //login
    
    if ( loginResult.hasOwnProperty('myToken') ){
      res.header("x-auth-token", loginResult.myToken);
      return res.status(200).send("you are logged in");
    } 
    else {
      return res.status(loginResult.status).json( loginResult ); // Error message
    }
  }

}

module.exports = new AuthController();
