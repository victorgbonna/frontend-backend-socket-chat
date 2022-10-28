const express = require('express')
const { getNotificationsByUser } = require('../../modules/notification/service')
const router = express.Router()

router.get('/all', async (req, res) => {
    try{
      const {userEntity, userId} = req.query;
      const notification= await getNotificationsByUser({
        userEntity, userId
      })
      return res.json({notification})  
    } 
    catch(e){
      return res.json({error:e})
    }
})


module.exports=router