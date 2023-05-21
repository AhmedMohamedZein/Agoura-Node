const nodemailer = require("nodemailer");
const path = require("path");
const user = require(path.join(__dirname, "../Models/User"));

class VERIFY_EMAIL {

   emailSender = async (req, res) =>{
        let config = {
            service: "gmail",
            auth: {
                user: "omaralaa0989@gmail.com",
                pass: "sdsgbxwrghumxmaq",
            },
        };

    let transporter = nodemailer.createTransport(config);

   
    var userId = req.params.id;
    var userEmail= await this.findUser(req)
    console.log("useremaiiiil",userEmail)
    let message = {
        from: "omaralaa0989@gmail.com",
        to: userEmail,
        subject: "confirm your Email",
        html:` Dear user please click the attached link to verify your email http://localhost:9000/verify/confirm/${userId}` ,
    };

        transporter
            .sendMail(message)
            .then(() => {
                return res.status(201).json({
                    msg: "you should receive an email",
                });
            })
            .catch((error) => {
                return res.status(500).json({ error });
            });
    }



     emailVerifire=async(req, res)=> {
        try {
            await user.findOneAndUpdate(
                { email: await this.findUser(req) }, // filter to match the user to update
                { isVerified: true }, // update fields
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "user is verified",
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "verification field",
            });
        }
    }

     findUser(req){
        try {
            var userId = req.params.id;
            const projection = { email: 1, _id: 0 }; // include only the 'email' field, exclude '_id' field
            return  user.findOne({ _id: userId }, projection).then((userEmail)=>{
            if(userEmail){
                return userEmail
            }})
            
           } catch (err) {
            res.status(500).json({
           "error":err
             })
           }

    }

}

module.exports = new VERIFY_EMAIL();




//#region 1
        // let MailGenerator = new Mailgen({
        //     theme: "default",
        //     product : {
        //         name: "Mailgen",
        //         link : 'https://mailgen.js/'
        //     }
        // })

        // let response = {
        //     body: {
        //         name : "Daily Tuition",
        //         intro: "Your bill has arrived!",
        //         table : {
        //             data : [
        //                 {
        //                     item : "Nodemailer Stack Book",
        //                     description: "A Backend application",
        //                     price : "$10.99",
        //                 }
        //             ]
        //         },
        //         outro: "Looking forward to do more business"
        //     }
        // }

        // let mail = MailGenerator.generate(response)
//#endregion 1

