const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isActive:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('userSchema',usersSchema)