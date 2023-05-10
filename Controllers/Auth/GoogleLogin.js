const iLogin = require('./iLogin');

// A class that extends "Implements" an (Interface) that's realy a class

class GoogleLogin extends iLogin {


    login = async (reqBody = null) =>{

        // Google Login Functionality
        return {
            message : "Google says Hello",
            status : 200
        };

    }

}

module.exports = new GoogleLogin() ;