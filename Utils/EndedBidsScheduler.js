const cron = require("node-cron");
const path = require("path");
const NotificationModel = require(path.join(
    __dirname,
    "../Models/Notification"
));
const BidModel = require(path.join(__dirname, "../Models/Bid"));
const UserModel = require(path.join(__dirname, "../Models/User"));
const ApartmentModel = require(path.join(__dirname, "../Models/Apartment"));

class EndedBidsScheduler {
    constructor(time) {
        this.task = cron.schedule(time, this.executeTask.bind(this));
    }

    start() {
        this.task.start();
    }
    stop() {
        this.task.stop();
    }

    async executeTask() {
        try {
            let apartments = await ApartmentModel.find({
                timeLeft: { $lt: Date.now() },
                status: "approved",
            }).populate({
                path: "bids",
                options: { sort: { amountMoney: -1 }, expired: false },
            });
            console.log("inside EndedBidsScheduler");
            for (let apartment of apartments) {
                let highestBid;
                if (apartment.bids.length > 0) {
                    highestBid = apartment.bids[0];
                    // add a day
                    let expireDate = new Date(Date.now() + 3600 * 1000 * 24);
                    // let expireDate = new Date(Date.now() + 3 * 1000 * 60);

                    console.log(expireDate);
                    let notification = await NotificationModel.create({
                        user: highestBid.user,
                        message: `congratulations you won the bid you can go and finish payment process you have 24 hours to finish the payment payment ends on ${expireDate}.`,
                        href: `/checkout/${apartment.itemId}`, // ToDo needs to be updated
                    });
                    apartment.status = "completed";
                    apartment.save();
                    await UserModel.findByIdAndUpdate(
                        { _id: highestBid.user },
                        { $push: { notifications: notification._id } }
                    );
                    await BidModel.findByIdAndUpdate(
                        { _id: highestBid._id },
                        { expireDate }
                    );
                } else {
                    apartment.status = "closed";
                    await apartment.save();
                    let notification = await NotificationModel.create({
                        user: apartment.owner,
                        message: "unfortunately the bid ended without any bids.",
                        href: `/place/${apartment.itemId}/history`, // ToDo needs to be updated
                    });
                    await UserModel.findByIdAndUpdate(
                        { _id: apartment.owner },
                        { $push: { notifications: notification._id } }
                    );
                }
            }
        } catch (error) {
            console.log(
                "An error occurred while setting finished bids status:" + error
            );
        }
    }
}

module.exports = EndedBidsScheduler;
