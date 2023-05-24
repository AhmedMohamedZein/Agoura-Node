const nodemailer = require("nodemailer");
const path = require("path");
const user = require(path.join(__dirname, "../Models/User"));
var Mailgen = require('mailgen');


class VERIFY_EMAIL {

  emailSender = async (req, res) =>{
    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);
    var userId = req.params.id;
    var userEmail= await this.findUser(req)
   
    let MailGenerator = new Mailgen({
      theme: "default",
      product : {
        name: "Mailgen",
        link : 'https://mailgen.js/'
      }
    })

    var response = {
      body: {
        name: 'New Agorian',
        intro: 'Welcome to agora! We\'re very excited to have you on board.',
        action: {
          instructions: 'To get started with agora, please click here:',
          button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:9000/verify/confirm/${userId}`
          }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    };

    let mail = MailGenerator.generate(response)
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Confirm your Email",
      html:mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          success:true,
          messsge: "you should receive an email",
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }


  emailVerifier = async (req, res) => {
    try {
      const email = await this.findUser(req);
      if(email){
        const update = { isVerified: true };
        const options = { new: true };
        const updatedUser = await user.findOneAndUpdate( { email: email.email }, update , options);   
        if (!updatedUser) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
    
        return res.redirect(`http://localhost:4200/login`);
      } 
    } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Verification failed',
        });
    }
  }

  async findUser(req){
    try {
      var userId = req.params.id;
      const projection = { email: 1, _id: 0 }; // include only the 'email' field, exclude '_id' field
      var userEmail = await user.findById({ _id: userId }, projection).exec();
      if(userEmail){ 
        return userEmail
      }
      } catch (err) {
        res.status(500).json({
        "error":err
      })
    }
  }

}

module.exports = new VERIFY_EMAIL();
