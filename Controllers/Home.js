const path = require('path')
const user = require(path.join(__dirname , '../Models/User'))
const apartment = require(path.join(__dirname , '../Models/Apartment'))
const cart = require(path.join(__dirname , '../Models/Cart'))
const notification = require(path.join(__dirname , '../Models/Notification'))




const getData = async function(req , res){

    const userEmail = 'ahmedzain@gmail.com' // res.auth to get  logged in user
    const userData = await user.findOne({email: userEmail})
    const carts = await cart.find({user:userData._id }).populate('apartments')
    const notifications = await notification.find({user:userData._id , deleted:false})
    const navData = {carts , notifications }

    await res.json(navData)
}

const deleteNotification = async function(req , res){
    const notificationId = req.params.id
    const userEmail = 'ahmedzain@gmail.com'
    const userData = await user.findOne({email: userEmail})
    const notifications = await notification.updateOne({_id:notificationId} , {deleted: true})
    console.log(notifications)
}


module.exports = {getData , deleteNotification}