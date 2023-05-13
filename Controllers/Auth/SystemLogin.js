const iLogin = require('./iLogin');
const loginValidation = require("../../Utils/loginValidation");
const bcrypt = require("bcrypt");
const userModel = require("../../Models/User");
const Token = require('./Token');
// A class that extends "Implements" an (Interface) that's realy a class

class SystemLogin extends iLogin {


    login = async(reqBody = null) => {
        
        var useremail = reqBody.email;
        var userPassword = reqBody.password;
        //check data validation
        var validateInputs = loginValidation(reqBody);
        if (!validateInputs) {
            return {
                message : "Data Not Valid",
                success : false ,
                status : 400
            } 
        }  

        //check email
        let foundedUser = await this._checkEmail(useremail);
        if (!foundedUser) {
            return {
                message : "Invalid Email or Password",
                success : false ,
                status : 400
            } 
        } 
        
        //check password
        var checkPassword = await this._checkPassword(foundedUser.password,userPassword)
        if (!checkPassword) {     
            return {
                message : "Invalid  Password",
                success : false ,
                status : 400
            }
        }
            
        //create Token
        var token = Token.createToken({'email': useremail});
        return {
            myToken : token,
            success : true ,
            status : 200
        }
    }
    
                
    // check user email in db
    async _checkEmail(useremail) {
        return await userModel.findOne({ email: useremail })
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
    _checkPassword(foundedUserPassword, userPassword) {
        return bcrypt
          .compare(userPassword, foundedUserPassword)
          .then((checkPassword) => {
           return checkPassword;
        })
        .catch((error) => {
            console.error(error);
        });
    }

}

module.exports = new SystemLogin() ;