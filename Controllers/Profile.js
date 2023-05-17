const path = require('path')
const User = require(path.join(__dirname , '../Models/User'))

class ProfileController {

    async getUserProfile(req, res) {
        const id = req.params.id;
        try {
          const user = await User.findOne({_id: id});
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          return res.json(user);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      }

    async updateUserProfile(req , res){
      let userID = req.params.id
      let {userName , email} = req.body
      let userImage = req.body.images[0]
      try{
        let isUpdated = await User.findOneAndUpdate({_id: userID} , {name:userName , email, image:userImage } , {new:true})
        if(isUpdated){
          return res.status(200).json({
              success:true,
              message: "user updated successfully",
              data: isUpdated
            })
        }else{
          throw new Error("user not found")
        }
      }catch(error){
        console.log(err)
        return res.json({
          success:false,
          message: err.message,
        });
      }
    }
}


module.exports = new ProfileController()