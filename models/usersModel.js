const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')

require('dotenv').config()


const usersSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    mailId: {
        type: String,
        required: true
    },
    token:{
        type:String,
    },
    profilePicUrl:{
        type:String,
        required:true
    }
})




usersSchema.methods.generateJWT=async function(){
    try{
    const user =  this
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY,
        { expiresIn: '1h',})
    user.token=token 
    await user.save()
    return token
    }catch(err){
       return err
    }
}


module.exports = mongoose.model('userSchema',usersSchema)
