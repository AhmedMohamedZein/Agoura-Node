const userModel = require("../Models/User");
const jwt =require("jsonwebtoken")

class AuthProviders {

    constructor(){
        
    }

    async googleAuth(req, res) {
        const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        if (!req.body.credential) {
            return res.json({
                success: false,
                message: "credential are required"
            });
        }
        const { OAuth2Client } = require("google-auth-library");
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.credential,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            let user = await userModel.findOne({ email: payload.email })
            if (!user) {
                user = new userModel({
                    name: payload["name"],
                    email: payload["email"],
                    password: process.env.seceret_password,
                });
                await user.save()
            }
            let token=jwt.sign({userId:user._id},process.env.jwt_secret)
            res.set("Access-Control-Expose-Headers", "X-Auth-Token");
            res.set("Access-Control-Allow-Headers", "X-Auth-Token");
            res.header("X-Auth-Token",token)
            return res.status(201).send({
                success: true,
                message: "successfully login"
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            })
        }
    }
}
module.exports = new AuthProviders()