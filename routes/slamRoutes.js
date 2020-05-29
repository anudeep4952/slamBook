const express= require('express');
const slamRouter=express.Router();
const slam=require('../models/slamModel')

slamRouter.get('/',async(req,res)=>{
    try{
        const slams = await slam.find()
        res.json(slams)
 }catch(err){
     res.send('Error ' + err)
 }
})

slamRouter.post('/', async(req,res) => {
    const slams= new slam({
        que1:req.body.que1,
        que2:req.body.que2,
        que3:req.body.que3,
        que4:req.body.que4,
        que5:req.body.que5,
    
    })
    try{
        const a1 =  await slams.save() 
        res.json({
            "status":"success"
        })
    }catch(err){
        res.send(err)
    }
})


module.exports=slamRouter;


