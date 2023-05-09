const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");
const userValidation = require("../Utils/userValidation");
const validate = require("../Utils/userValidation");
const loginValidation = require("../Utils/loginValidation");
const bcrypt = require("bcrypt");
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


  login = async (req, res) => {
    var useremail = req.body.email;
    var userPassword = req.body.password;

    //check data validation
    var validateInputs = loginValidation(req.body);
    if (validateInputs) {

      //check email
      var foundedUser = await this.checkEmail(useremail);
      console.log(foundedUser)
      if (!foundedUser) {
        //if user doesnot exist
        res.status(400).send("Invalid Email or Password");
      }else{
      //check password
      var checkPassword = await this.checkPassword(foundedUser.password,userPassword);
      if (!checkPassword) 
      {
        //if password not match
        console.log("Passwords do not match");
        res.status(400).send("Invalid  Password");
      }else{
        //send token
        var token = this.sendToken();
        res.header("x-auth-token", token);
        res.status(200).send("you are logged in");
      } 
    }
  } else {//if data not valid
    res.status(400).send("Data Not Valid");
  }
  }

 

  // check user email in db
  checkEmail(useremail) {
    var foundedUser = userModel.findOne({ email: useremail }).exec();
    if (foundedUser.email) {
      console.log(foundedUser);
      return foundedUser;
    }
  }
  

  //check password
  checkPassword(foundedUserPassword, userPassword) {
    bcrypt
      .compare(userPassword, foundedUserPassword)
      .then((checkPassword) => {
        if (checkPassword) {
          console.log(checkPassword);
          return checkPassword;
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
