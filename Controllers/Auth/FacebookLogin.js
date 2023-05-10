const iLogin = require('./iLogin');

// A class that extends "Implements" an (Interface) that's realy a class

class FacebookLogin extends iLogin {


    login() {

        // Facebook Login Functionality
       

    }

}

module.exports = new FacebookLogin() ;