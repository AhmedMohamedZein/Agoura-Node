const cron = require('node-cron')
const path = require('path')
const NotificationModel = require(path.join(__dirname , '../Models/Notification'))
const BidModel = require(path.join(__dirname , '../Models/Bid'))
const UserModel = require(path.join(__dirname , '../Models/User'))
const ApartmentModel = require(path.join(__dirname , '../Models/Apartment'))


class NotifyHighestBidderScheduler{

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
            console.log("inside NotifyHighestBidderScheduler")

            let apartments = await ApartmentModel.find({status:"completed"})
        .populate({ path: "bids",match: { expired: false }, options: { sort: { amountMoney: -1 },expired:false} })

        apartments.map(async (apartment) => {
            
            //find apartments which still have bidders that may accept to pay
            // console.log("before",apartment.bids)
            console.log(apartment.bids.length,"all bidders refused to buy the apartment send notifcation to owner")
            if(apartment.bids.length === 0){// all bidders refused to buy the apartment send notifcation to owner
                let notification=await NotificationModel.create({
                    user:apartment.owner,
                    message:"unfortunately all bidder refused to pay.",
                    href:`/place/${apartment.itemId}/history` // ToDo needs to be updated
                })
                apartment.status="closed"
                apartment.save()
                let user=await UserModel.findByIdAndUpdate({_id:apartment.owner},{$push: { notifications: notification._id }})
                console.log(apartment.title,"1")
                return 
            }
            
            //find apartments which the bidder expiredate ended and update expired field
            apartment = await ApartmentModel.findOne({_id: apartment._id, status: "completed"})
            .populate({ 
                path: "bids", 
                match: { expired: false, expireDate: { $lt: Date.now() } },
                options: { sort: { amountMoney: -1 } }
            });
            if( apartment.bids.length === 0){
                return
            }
            await BidModel.findByIdAndUpdate({_id:apartment.bids[0]._id},{expired: true})


            // continue from here
            apartment = await ApartmentModel.findOne({ _id: apartment._id, status: "completed" })
                .populate({
                    path: "bids",
                    match: { expired: false, expireDate: { $eq: null } },
                    options: { sort: { amountMoney: -1 } }
                });
            if(apartment.bids.length === 0){// all bidders refused to buy the apartment send notifcation to owner
                return
            }
            let highestBid=apartment.bids[0]
            // add a day
            let expireDate=new Date(Date.now() + ( 3600 * 1000 * 24));
            // let expireDate=new Date(Date.now() + ( 1000*3*60));

            console.log(expireDate)
            let notification=await NotificationModel.create({
                user:highestBid.user,
                message:`congratulations you won the bid you can go and finish payment process you have 24 hours to finish the payment payment ends on ${expireDate}.`,
                href:`/place/${apartment.itemId}/history` // ToDo needs to be updated
            })
            apartment.status="completed"
            apartment.save()
            await UserModel.findByIdAndUpdate({_id:highestBid.user},{$push: { notifications: notification._id }})
            await BidModel.findByIdAndUpdate({_id:highestBid._id},{expireDate})

        })
        } catch(error) {
            console.log('An error occurred while sending finished bids notifications:'+ error)
        }
    }
}

module.exports = NotifyHighestBidderScheduler