const iLogin = require('./iLogin');

// A class that extends "Implements" an (Interface) that's realy a class

class SystemLogin extends iLogin {


    login(reqBody = null){

        // Google Login Functionality
        console.log("System says Hello");

    }

}

module.exports = new SystemLogin() ;