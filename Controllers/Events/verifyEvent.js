const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const verifyEmailController = require("../VerifyEmail");
// function verifyEmailEvent(id, res) {

//   return res.redirect(`/verify/${id}`);
  
// }

myEmitter.once("register", verifyEmailController.emailSender);

module.exports = myEmitter;
