const iLogin = require('./iLogin');
const jwtToken=require('./Token');
const userModel = require("../../Models/User");


// A class that extends "Implements" an (Interface) that's realy a class

class GoogleLogin extends iLogin {


    login = async (body) =>{
        const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        console.log(body)
        if (!body.credential) {
            return res.json({
                success: false,
                message: "credential are required"
            });
        }
        const { OAuth2Client } = require("google-auth-library");
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: body.credential,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            let user = await userModel.findOne({ email: payload.email })
            if (!user) {
                user = new userModel({
                    name: payload["name"],
                    email: payload["email"],
                    password: process.env.secret_password,
                });
                await user.save()
            }
            let token=jwtToken.createToken({userId:user._id,email:user.email,isAdmin:user.isAdmin})
            
            return {
                myToken:token,
                success:true,
                status:201,
                message: "you are logged in",
            }
        } catch (err) {
            
            return {
                status:400,
                message: err.message,
                success:false,

            }
        }
    }

}

module.exports = new GoogleLogin() ;