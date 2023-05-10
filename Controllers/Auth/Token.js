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
        // verifyToken
    }
}