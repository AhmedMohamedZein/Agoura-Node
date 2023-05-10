const cron = require('node-cron')
const path = require('path')
const Notification = require(path.join(__dirname , '../Models/Notification'))

class NotificationScheduler{

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

            const deletedItems = await Notification.deleteMany({deleted: true})
            console.log(deletedItems)

        } catch(error) {
            console.log('An error occurred while removing notifications:'+ error)
        }
    }
}

module.exports = NotificationScheduler