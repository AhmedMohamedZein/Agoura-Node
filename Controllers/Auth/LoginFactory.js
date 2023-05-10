const google = require('./GoogleLogin');
const facebook = require('./FacebookLogin');
const system = require('./SystemLogin');

module.exports = class LoginFactory {

    static createLoginObject (path) { // 
        const loginObject = LoginFactory._getRoute(path); // google, facebook ... etc

        switch (loginObject) {
            case 'google' : return google;
            case 'facebook' : return facebook;
            case 'login' : return system;

            default : throw new Error ('Error happend in the loginFactory !!');
        }
    }
    
    static _getRoute(path) { // Handle the path splite -->> req.path = /login/google -->> return google
        const pathArray = path.split('/');
        const logMeIn = pathArray[pathArray.length - 1];
        return logMeIn ;
    }

}