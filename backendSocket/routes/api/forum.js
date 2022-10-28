const express = require('express')
const { addForum, getForumMsgsByBootcampId } = require('../../modules/forum/service')
const { addNotification} = require('../../modules/notification/service')
const router = express.Router()

//add product
router.post('/add', async (req, res) => {
    try{
        console.log({reqbody:req.body})
      const io = req.app.get('socketio')
      const forum= await addForum(req.body)
    //   io.in(req.body.bootcampId).emit("recieve_message", forum)      
    //   const [mentorsInBtc, menteesInBtc]= await Promise.all([
    //     ListMentorsInBtcReq({ btcId: btcData.bootcamp.id }),
    //     ListMenteesInBtcReq({  btcId: btcData.bootcamp.id }),
    //   ])
      
      const notifyBody={
        sender: req.body.username,
        content:"forum has been made to a bootcamp",
        mentor_recipients:[], mentee_recipients:[],
        org_recipients:[req.body.orgId]
      }
      const notification= await addNotification(notifyBody)

    //   io.in(req.body.bootcampId).emit('recieve_notification', notification)
      return res.json({forum, notification})  
    } 
    catch(e){
        console.log(({e}))
      return res.json({error:e})
    }
})

router.get('/all/:bootcampId', async (req, res) => {
    try{
      const {bootcampId} =req.params
      const forums= await getForumMsgsByBootcampId(
        parseInt(bootcampId)
      )
      return res.json({forums})  
    } 
    catch(e){
      return res.json({error:e})
    }
})


module.exports=router


module.exports=router