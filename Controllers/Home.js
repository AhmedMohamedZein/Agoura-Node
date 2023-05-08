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
    const apartments = await apartment.find({})
    // console.log(apartments)
    const homeData = {carts , notifications , apartments  }
    // console.log(navData)
    await res.json(homeData)
}

const deleteNotification = async function(req , res){
    const notificationId = req.params.id
    const notifications = await notification.updateOne({_id:notificationId} , {deleted: true})
    console.log(notifications)
}

const deleteItemFromCart = async function(req, res) {
    const userEmail = 'ahmedzain@gmail.com'; // res.auth to get logged in user
    const userData = await user.findOne({ email: userEmail })
  
    const itemId = req.params.id;
    const item = await cart.findOneAndUpdate(
        { user: userData._id },
        { $pull: { apartments: itemId } }
      )
  
    console.log(item);
  };


module.exports = {getData , deleteNotification , deleteItemFromCart}