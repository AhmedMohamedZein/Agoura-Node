const userModel = require("../Models/User");
const validate = require("../Utils/userValidation");

const EventEmitter = require('events');

// create a new instance of the EventEmitter class
const myEmitter = new EventEmitter();

myEmitter.once('register',(id,res)=>{
  res.redirect(`/verify/${id}`)
})