const path = require('path')
const User = require(path.join(__dirname , '../Models/User'))


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
}



module.exports = new ProfileController()