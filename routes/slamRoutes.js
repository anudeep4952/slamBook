const express= require('express');
const slamRouter=express.Router();
const link=require("../models/linkModel")
const slam=require('../models/slamModel')


slamRouter.get('/:userid',async(req,res)=>{
    try{
        console.log("gfhsf");        const slams = await slam.find({userid:req.params.userid})
        res.json(slams)
 }catch(err){
     res.send('Error' + err)
 }
})


slamRouter.post('/:userid/:id', async(req,res) => {
    const slams= new slam({
        userid:req.params.userid,
        que1:req.body.que1,
        que2:req.body.que2,
        que3:req.body.que3,
        que4:req.body.que4,
        que5:req.body.que5,
        que6:req.body.que6,
        que7:req.body.que7,
        que8:req.body.que8,
        que9:req.body.que9,
        que10:req.body.que10,
        que11:req.body.que11,
        que12:req.body.que12     
        })

    try{
        const a1 =  await slams.save() 
        link.findByIdAndRemove(req.params.id,(err,link)=>{
            if(link==null) {res.send(null)} 
            else res.send(a1)
        })
        
    }catch(err){
        res.send(err)
    }
})

slamRouter.delete('/:userid/:id',async(req,res)=>{
    slam.findByIdAndRemove(req.params.id,(err,slam)=>{
        if(slam==null){
            res.send(0)
    
    } else {res.send(1)}

    })
})
module.exports=slamRouter;


