const path = require('path')
const User = require(path.join(__dirname , '../Models/User'))


class ProfileController {

    async getUserProfile(req, res) {
        const id = req.params.id;
        try {
          const user = await User.findOne({_id: id});
          console.log(user)
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          return res.json(user);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      }

    async updateUserProfile(req , res){

    }

}



module.exports = new ProfileController()