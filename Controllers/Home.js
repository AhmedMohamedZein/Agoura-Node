const path = require('path')
const user = require(path.join(__dirname , '../Models/User'))
const apartment = require(path.join(__dirname , '../Models/Apartment'))
const cart = require(path.join(__dirname , '../Models/Cart'))
const notification = require(path.join(__dirname , '../Models/Notification'))


const getData = async function(req , res){

    try{
        const userEmail = 'ahmedzain@gmail.com' // res.auth to get  logged in user
        const userData = await user.findOne({email: userEmail})
        const carts = await cart.find({user:userData._id }).populate('apartments')
        const notifications = await notification.find({user:userData._id , deleted:false})
        const apartments = await apartment.find({})
        const homeData = {carts , notifications , apartments}
        await res.status(200).json(homeData)
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const deleteNotification = async function(req , res){

    try{
        const notificationId = req.params.id
        const notifications = await notification.updateOne({_id:notificationId} , {deleted: true})
        await res.status(200).json(notifications)
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const deleteItemFromCart = async function(req, res) {

    try{
        const userEmail = 'ahmedzain@gmail.com'; // res.auth to get logged in user
        const userData = await user.findOne({ email: userEmail })
        const itemId = req.params.id;
        const item = await cart.findOneAndDeleteByItem(userData._id , itemId )
        await res.status(200).json(item)
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
  
  };

  const addToCart = async function(req , res){

    try{
        const userEmail = 'ahmedzain@gmail.com'; // res.auth to get logged in user
        const userData = await user.findOne({ email: userEmail })
        const itemId = req.body.id
        const carts = await cart.findOneAndUpdateByItem(userData._id , itemId)
        await res.status(200).json(carts)

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
    
  }


module.exports = {getData , deleteNotification , deleteItemFromCart , addToCart}