const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");


module.exports = class Token {


    //send tokin to user
    static createToken(email) {
        const secret = process.env.TOKEN_SECRET;
        const token = jwt.sign(email, secret);
        return token;
    }

    static verifyToken(token) {
        // verifyToken
    }
}