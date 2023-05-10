
// A class that extends "Implements" an (Interface) that's realy a class
const LoginStrategy = require('./LoginStrategy');
const LoginFactory = require('./LoginFactory');
class Login {


    login = async (req, res)=> {

        const logMeIn = LoginFactory.createLoginObject(req.path); // googleObject.login
        const loginStrategy = new LoginStrategy (logMeIn);
        const loginResult = await loginStrategy.execute(req.body); //login
        
        if ( loginResult.hasOwnProperty('myToken') ){
            res.set("Access-Control-Expose-Headers", "X-Auth-Token");
            res.set("Access-Control-Allow-Headers", "X-Auth-Token");
            res.header("X-Auth-Token",loginResult.myToken);
            console.log(loginResult.myToken)
            return res.status(loginResult.status).json(loginResult);
        } 
        else {
          return res.status(loginResult.status).json( loginResult ); // Error message
        }
    }

}

module.exports = new Login() ;