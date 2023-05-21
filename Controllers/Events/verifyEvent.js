const EventEmitter = require("events");
const myEmitter = new EventEmitter();

function verifyEmailEvent(id, res) {

  res.redirect(`/verify/${id}`);
  
}

myEmitter.once("register", verifyEmailEvent);

module.exports = myEmitter;
