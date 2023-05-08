const jwt = require("jsonwebtoken");
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



  async login(req, res) {
    validateInputs = this.vlidateUserInput();
    if (validateInputs) {
      foundedUser = await this.checkEmail();
      if (foundedUser) {
        checkPassword = await this.checkPassword();
        if(checkPassword){
          token=this.sendToken();
          res.header("x-auth-token",token)
          res.status(200).send("you are logged in")
        }
      }
    }
  }



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
    foundedUser = userModel.findOne({ email: req.body.email }).exec();
    if (foundedUser) {
      return foundedUser;
    } else {
      res.status(400).send("Invalid Email or Password");
    }
  }





  //check password
  checkPassword(foundedUser) {
    checkPassword = bcrypt.compare(req.body.password, foundedUser.password);
    if (checkPassword) {
      return checkPassword;
    } else {
      res.status(400).send("Invalid Email or Password");
    }
  }




  //send tokin to user
  sendToken() {
    const payload = req.body.email;
    const secret = "my-secret-key";
    const token = jwt.sign(payload, secret);
    return token;
  }
}



module.exports = new AuthController();
