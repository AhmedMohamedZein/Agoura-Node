const EventEmitter = require('events');
// create a new instance of the EventEmitter class
const myEmitter = new EventEmitter();

 function verifyEvent(id,res){

     res.redirect(`/verify/${id}`)
     
     }
 myEmitter.once('register',verifyEvent)

module.exports = verifyEvent;

// const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

// function onMyEvent(data) {
//   console.log(`Received data: ${data}`);
// }

// myEmitter.on('myEvent', onMyEvent);

// module.exports = myEmitter;