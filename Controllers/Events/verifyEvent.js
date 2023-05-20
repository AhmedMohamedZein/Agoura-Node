const EventEmitter = require('events');
myEmitter = new EventEmitter();

class VerifyEvent {

 VerifyEvent(){
// create a new instance of the EventEmitter class
 myEmitter.once('register',(id,res)=>{
  res.redirect(`/verify/${id}`)
})
    }
}