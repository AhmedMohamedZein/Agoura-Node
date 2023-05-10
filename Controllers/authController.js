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


//login function
  login = async (req, res) => {
    var useremail = req.body.email;
    var userPassword = req.body.password;

    //check data validation
    var validateInputs = loginValidation(req.body);
       if (!validateInputs) {

           //if data not valid
            res.status(400).send("Data Not Valid");
            return; 
          }  

         //check email
           let foundedUser = await this.checkEmail(useremail);
       if (!foundedUser) {

          //if user doesnot exist
          res.status(400).send("Invalid Email or Password");
          return;
         } 

         //check password
         var checkPassword = await this.checkPassword(foundedUser.password,userPassword)
        if (!checkPassword) {

         //if password not match
         res.status(400).send("Invalid  Password");
         return;
          } 

          //send token
          var token = this.sendToken(useremail);
          res.header("x-auth-token", token);
          res.status(200).send("you are logged in");
          // req.session.token = token;
                }
        
       




  // check user email in db
  async checkUser(useremail,hashedPassword) {

    return await userModel.findOne({ email: useremail,hashedPassword })
      .then((foundedUser) => {
        if (foundedUser) {
          // Document found
          return foundedUser;
        }
      })
       .catch((error) => {
        console.error(error);
      });
  }



  //check password
  checkPassword(password) {
    // Generate a salt for the hash
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error(err);
    return;
  }

  // Hash the password with the salt
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(hash); // Prints the hashed password
  });
});
  }



  //send tokin to user
  sendToken(email) {
       const secret = "my-secret-key";
       const token = jwt.sign(email, secret);
       return token;
  }
}
module.exports = new AuthController();
