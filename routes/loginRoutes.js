const express=require('express')
const jwt=require('jsonwebtoken')
const passport = require('passport');
const userSchema=require('../models/usersModel')

require('dotenv').config()

const loginRouter=express.Router()
try{
loginRouter.get(
    '/',
    passport.authenticate('google', {scope: ['email', 'profile']}),(req,res)=>{
})
}catch(err){
    res.status(404).send({"error":err})
}

try{
loginRouter.get('/callback'
          ,passport.authenticate('google', {scope: ['email', 'profile']}),
       async(req,res)=>{   
        console.log('i am in console')   
        const usr=new userSchema({
            username:req.user.displayName,
            mailId:req.user.mailId,
            profilePicUrl:req.user.image
        })
        const alu=userSchema.findOneAndUpdate(usr,)
        await usr.save()
        const token=await usr.generateJWT()
        const id=usr['_id']
        //res.status(201).json(usr)
        res.cookie('userValidation',token,{httpOnly: false, secure: false ,
            expires: new Date(Date.now() + 600000)
           // domain: 'http://anudeep4952.pythonanywhere.com/'
        });
        res.redirect('http://anudeep4952.pythonanywhere.com/')
});
}catch(error){
    res.status(400).send({"error":error})
} 

loginRouter.get('/check',(req,res)=>{
    res.json(req.cookies);
    console.log(req.cookies)
})




const auth=async(req,res,next)=>{
    try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)       
    if(req.params.userId==data['_id'])
     next()
    else
     throw new Error() 
    }catch(error){
        if(error['name']=="TokenExpiredError")
        res.status(404).send({"error":error,"message":"expired"})
        else
        res.status(404).send({"error":error,"message":"unauthorized"})
    }
}



module.exports={router:loginRouter,
auth:auth};
