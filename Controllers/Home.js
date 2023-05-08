const path = require('path')
const user = require(path.join(__dirname , '../Models/User'))
const apartment = require(path.join(__dirname , '../Models/Apartment'))
const cart = require(path.join(__dirname , '../Models/Cart'))
const notification = require(path.join(__dirname , '../Models/Notification'))




const getData = async function(req , res){

    const userEmail = 'ahmedzain@gmail.com' // res.auth to get  logged in user
    const userData = await user.findOne({email: userEmail})
    const carts = await cart.find({user:userData._id }).populate('apartments')
    console.log(carts)

    const notifications = await notification.find({user:userData._id , deleted:false})

    const navData = {carts , notifications }
    console.log(navData)

    await res.json(navData)
}

function createData(){
    const apart = new apartment({title: 'villa' ,description:'villa in kafrabdo' ,
    address:{counrty:'egy' , city:'alex' , street:'66' , zipCode:'12564'},
    features:{bedRooms:3 , baths:2 , area:50,kitchen:1,guests:4},price:5000,owner:userData._id , agreeToTerms:true})
    apart.save()
    const newCart = new cart({ user: userData._id, apartments: [apartData._id] });
    newCart.save()
    console.log(newCart.apartments)
}



module.exports = getData