const iLogin = require('./iLogin');

// A class that extends "Implements" an (Interface) that's realy a class

class GoogleLogin extends iLogin {


    login(reqBody = null){

        // Google Login Functionality
        console.log("Google says Hello");

    }

}

module.exports = new GoogleLogin() ;