const express=require('express')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const loginRouter=express.Router()

try{
    loginRouter.post('/',(req,res,next)=>{

    const userId= req.body.userId

    const token=jwt.sign(
        {userId:userId},
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h',})
    res.status(201).send({"token":token})
})
}catch(error){
    res.status(400).send({"error":error})
} 



const auth=async(req,res,next)=>{
    try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)       
    if(req.params.userId==data['userId'])
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
