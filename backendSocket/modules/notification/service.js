const Notification= require('./model')

const addNotification = async (notifyInput) =>{
    const notification=new Notification(notifyInput)
    await notification.save()
    return notification
}
const getNotificationsByUser = async ({userEntity,userId}) =>{
    let forums=[]
    if(userEntity=="mentor"){
        // mentor_recipients
        forums= await Notification.find({mentor_recipients: userId})
    }
    if(userEntity=="mentee"){
        forums= await Notification.find({mentee_recipients: userId})
        // mentee_recipients
    }
    if(userEntity=="org"){
        forums= await Notification.find({org_recipients:userId})
        // org_recipients
    }

    return forums
}

module.exports={addNotification, getNotificationsByUser}
