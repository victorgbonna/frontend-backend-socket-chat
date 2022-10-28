const mongoose= require('mongoose')

const forumSchema= new mongoose.Schema({
    username:{
        type: String,
    },
    userEntity:{
        type: String,
        enum:['org','mentor', 'mentee'],
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    content:{
        type: String
    },
    type:{
        type: String,
        default:'post',
        enum:['announcement','post']
    },
    mentions:{
        type: [String]
    },
    bootcampId:{
        type: Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Forum',forumSchema)