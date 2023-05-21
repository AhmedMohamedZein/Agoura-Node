const EventEmitter = require('events');
// create a new instance of the EventEmitter class
const myEmitter = new EventEmitter();


 function verifyEvent(){

myEmitter.once('register',(id,res)=>{

  res.redirect(`/verify/${id}`)
})}

module.exports = verifyEvent;