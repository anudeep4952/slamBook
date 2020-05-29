const express= require('express');
const authenicationRouter=express.Router();
const user=require('../models/usersModel')

authenicationRouter.get('/',async(req,res)=>{
    try{
        const users = await user.find()
        res.json(users)
 }catch(err){
     res.send('Error ' + err)
 }
})

authenicationRouter.post('/', async(req,res) => {
    const users= new user({
        username: req.body.username,
        mailId: req.body.mailId,
        password: req.body.password
    })
    try{
        const a1 =  await users.save() 
        res.json({
            "status":"success"
        })
    }catch(err){
        res.send(err)
    }
})


module.exports=authenicationRouter;


