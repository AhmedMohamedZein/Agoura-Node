const path = require('path')
const user = require(path.join(__dirname , '../Models/User'))




const getData = async function(req , res){
    const userData = await user.find({})
    console.log(userData)
}



module.exports = getData