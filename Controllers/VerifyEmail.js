const nodemailer = require("nodemailer");
const path = require("path");
const user = require(path.join(__dirname, "../Models/User"));

class VERIFY_EMAIL {
  // async..await is not allowed in global scope, must use a wrapper
  async emailSender(req, res) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",

    //   // true for 465, false for other ports
    //     auth: {
    //         user: 'omaralaa2698@gmail.com', // generated ethereal user
    //         pass: 'sdsgbxwrghumxmaq', // generated ethereal password
    //     },
    // });

    let config = {
      service: "gmail",
      auth: {
        user: "omaralaa0989@gmail.com",
        pass: "sdsgbxwrghumxmaq",
      },
    };

    let transporter = nodemailer.createTransport(config);

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

    let message = {
      from: "omaralaa0989@gmail.com",
      to: "omaralaa2698@gmail.com",
      subject: "confirm your Email",
      html: "Dear user please click the attached link to verify your email http://localhost:9000/verify/confirm ",
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

  async emailVerifire(req, res) {
    //  email="ahmedzain@gmail.com"
    //  const user = await user.findOne({email: "ahmedzain@gmail.com"})
    try {
      await user.findOneAndUpdate(
        { email: "ahmedzain@gmail.com" }, // filter to match the user to update
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
//     async function updateUserById(userId, updateFields) {
//       try {
//         const updatedUser = await User.findOneAndUpdate(
//           { _id: userId },
//           updateFields,
//           { new: true }
//         );
//         console.log(updatedUser);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
}

module.exports = new VERIFY_EMAIL();
