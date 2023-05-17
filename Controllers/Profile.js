const path = require('path')
const User = require(path.join(__dirname , '../Models/User'))
const Bid = require(path.join(__dirname , '../Models/Bid'))


// function setupRequest(req, res, next) {
//   req.body=JSON.parse(req.body.data)
//   req.body.images=[]
//   next()
// }
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
      console.log(req.params.id)
      console.log(req.file)
      console.log(req.body)
    }

    async getUserBids(req , res){

      try{

        const bidsData = await Bid.findOne({user: req.user._id})
        return res.status(200).json({
          success: true,
          message: 'data fetched successfully',
          data: bidsData
        })

      }catch(error){
        return res.status(500).json({
          success: false,
          message: "there is something wrong"
        })
      }
    }
}



module.exports = new ProfileController()