const cron = require('node-cron')
const path = require('path')
const NotificationModel = require(path.join(__dirname , '../Models/Notification'))
const BidModel = require(path.join(__dirname , '../Models/Bid'))
const UserModel = require(path.join(__dirname , '../Models/User'))
const ApartmentModel = require(path.join(__dirname , '../Models/Apartment'))


class EndedBidsScheduler{

    constructor(time){
        this.task = cron.schedule(time , this.executeTask.bind(this))
    }

    start(){
        this.task.start()
    }
    stop(){
        this.task.stop()
    }

    async executeTask(){
        try{
            let apartment = await ApartmentModel.updateMany({timeLeft: {$gt:Date.now()},status:"approved"},{status:"completed"})
        } catch(error) {
            console.log('An error occurred while setting finished bids status:'+ error)
        }
    }
}

module.exports = EndedBidsScheduler