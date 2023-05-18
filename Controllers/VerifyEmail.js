const nodemailer = require("nodemailer");

class VERIFY_EMAIL{

    // async..await is not allowed in global scope, must use a wrapper
    async emailSender(req,res) {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 225,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    
    //   create reusable transporter object using the default SMTP transport

    //   let transporter = nodemailer.createTransport({
    //       host: "smtp.ethereal.email",
    //       port: 2525,
    //       secure: false, // true for 465, false for other ports
    //       auth: {
    //       user: testAccount, // generated ethereal user
    //       pass: testAccountpass, // generated ethereal password
    //     },
    //   });



    //   var transporter = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 587,
    //     auth: {
    //       user: "2f2cc136ac7789",
    //       pass: "86bb335407f63e"
    //     }
    //   });


    //   const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'keven55@ethereal.email',
    //         pass: 'Yk1TvvvS3n3z1hTuHq'
    //     }
    // });


      var message= {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
    
      // send mail with defined transport object
    //   let info = await transporter.sendMail(message);



      await transporter.sendMail(message).then((info) => {
        return res.status(201).json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        // console.log(info)
        return res.status(500).json({ error })
    })



    
    //   console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    


}




module.exports=new VERIFY_EMAIL();