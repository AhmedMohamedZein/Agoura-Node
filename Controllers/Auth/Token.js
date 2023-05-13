const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");


module.exports = class Token {


    //send tokin to user
    static createToken(payload) {
        const secret = process.env.TOKEN_SECRET;
        const token = jwt.sign(payload, secret);
        return token;
    }

    static verifyToken(token) {
        const secret = process.env.TOKEN_SECRET;
        try {
            let user=jwt.verify(token, secret);
            return user;
        }catch(error){
            return false; 
        }
    }
}