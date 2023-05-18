const nodemailer = require("nodemailer");

class VERIFY_EMAIL{

    // async..await is not allowed in global scope, must use a wrapper
    async emailSender(req,res) {
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
    
   






    //   var message= {
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    //   }
    
      // send mail with defined transport object
    //   let info = await transporter.sendMail(message);



    //   await transporter.sendMail(message).then((info) => {
    //     return res.status(201).json({ 
    //         msg: "you should receive an email",
    //         info : info.messageId,
    //         preview: nodemailer.getTestMessageUrl(info)
    //     })
    // }).catch(error => {
    //     // console.log(info)
    //     return res.status(500).json({ error })
    // })


    let config = {
        service : 'gmail',
        auth : {
            user: 'omaralaa0989@gmail.com', 
            pass: 'sdsgbxwrghumxmaq', 
        }
    }

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
        from : 'omaralaa0989@gmail.com',
        to : 'omaralaa2698@gmail.com',
        subject: "confirm your Email",
        html: " agora bt2olak 7la msa 3la f5adak"
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })


    
    
    }
    
    


}




module.exports=new VERIFY_EMAIL();