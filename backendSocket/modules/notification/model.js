const mongoose= require('mongoose')

const notiSchema= new mongoose.Schema({
    sender:{
        type: String,
    },
    content:{
        type: String
    },
    mentor_recipients:{
        type: [Number]
    },
    mentee_recipients:{
        type: [Number]
    },
    org_recipients:{
        type:[Number]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Notification',notiSchema)