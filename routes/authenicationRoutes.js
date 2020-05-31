const express= require('express');
const authenicationRouter=express.Router();
const user=require('../models/usersModel');
const nodemailer = require('nodemailer');
const activationLinksSchema=require('../models/activationLinksModel')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'slamdev@yandex.com',
        pass: 'bKc8vUXNg30LYm6A'
    }
});


authenicationRouter.get('/',async(req,res)=>{
    try{
        const users = await user.find()
        res.json(users)
 }catch(err){
     res.send('Error ' + err)
 }
})

authenicationRouter.get('/deleteAll',async(req,res)=>{
    try{
        const users = await user.deleteMany({})
        res.json(users)
 }catch(err){
     res.send('Error ' + err)
 }
})


////////////////////////////////////////// REGISTER //////////////////////////////////////////////////////////////////
authenicationRouter.post('/', async(req,res,next) => {


    if (await checkusername(req.body.username))
   { 
       res.json({
        "status":"error",
        "message":"username already exits"
    })
    
   }
    else if (await checkemail(req.body.mailId))
    {   res.json({
        "status":"error",
        "message":"maild already registered"
    })
    }

    else{

    const users= new user({
        username: req.body.username,
        mailId: req.body.mailId,
        password: req.body.password
    })
    try{
        const a1 =  await users.save() 
       // await sendMail(req.body.mailId,a1['id']);
        res.json({
            "status":"success"
        })

    }catch(err){
        next(err)
    }
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////// ACTIVATE ACCOUNT //////////////////////////////////////////////////////////////////

authenicationRouter.get('/verify/:username/:linkId',async(req,res)=>{
   const username = req.params.username
   const linkId=req.params.linkId
   const link=await activationLinksSchema.find({activationLink:linkId,username:username},(err,usr)=>{
       if (err)
        res.send('error')
        else
        //res.send(usr)
        {
            if(usr.length==1){
                console.log(usr[0]['username'])
                    user.findByIdAndUpdate(usr[0]['username'],{isActive:true},{new: true},async(err, model)=>{
                        await activationLinksSchema.findByIdAndDelete(link['id'])
                        res.json({
                            "status":"success"
                        })
                   })
                }
            else       
            res.json({
                "status":"error"
            })
            
        }
   })

})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async function sendMail(mailId,username){

    const linkId = Date.now().toString()

    const links= new activationLinksSchema({
        activationLink:linkId,
        username:username
    })

    try{
    await links.save() 
    }catch(err){
        res.json({
            "status":"error"
        })
    }
    console.log('sending mail')
    let mailOptions = {
        from: '"Fred Foo 👻" <anudeep832@yandex.com>', // sender address
        to: [mailId], // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<form action=`http://localhost:8081/verify/${username}/${linkId}`><input type="submit" value="Activate Account" /></form>' // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    
}


async function checkusername (name){
  try{var x=await user.find({username:name},(err,doc)=>{   
     if(err)
     next(err);
 })
 return x.length!=0
 }catch(err){
    next(err);
 }
}

async function checkemail (email){
  try{
    var x=await user.find({mailId:email},(err,doc)=>{
        if(err)
        next(err);
    })
   return x.length!=0
}catch(err){
    next(err);
}
}

process.on('warning', e => console.warn(e.stack));
module.exports=authenicationRouter;

