const iLogin = require('./iLogin');

// A class that extends "Implements" an (Interface) that's realy a class

class FacebookLogin extends iLogin {


    login = async (reqBody = null) => {

        // Facebook Login Functionality
        return {
            message : "Facebook says Hello",
            status : 200
        };
    }

}

module.exports = new FacebookLogin() ;