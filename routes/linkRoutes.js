const express= require('express');
const linkRouter=express.Router();
const link=require("../models/linkModel")

linkRouter.post('/:userid/:name',async(req,res)=>{
        
    const plink= new link({
        link:"/writemyslam/"+req.params.userid+"/"+req.params.name
    })
    try{         
        const p1 =  await plink.save() 
        plink.link="/writemyslam/"+req.params.userid+"/"+req.params.name+"/"+p1._id
        const p2 =  await plink.save() 
        res.json({
            "ShareLink": ""+p2.link
        })
           }catch(err){
        res.send(err)
    }
})



linkRouter.get('/:id',async(req,res)=>{
    try{
        const links = await link.findById(req.params.id)
        if(links==null)
        {
        res.json({"status":"link is not valid anymore!"})
       }
        else
        {
          res.json({"status":"yayy! fill the slam now!!"})
        } 
 
} catch(err){
     res.send('Error ' + err)
 }
})


module.exports=linkRouter;