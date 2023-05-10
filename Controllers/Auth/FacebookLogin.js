const iLogin = require('./iLogin');

// A class that extends "Implements" an (Interface) that's realy a class

class FacebookLogin extends iLogin {


    login(reqBody = null) {

        // Facebook Login Functionality
        console.log("Facebook says Hello");

    }

}

module.exports = new FacebookLogin() ;