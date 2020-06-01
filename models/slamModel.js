const mongoose = require('mongoose')


const slamSchema = new mongoose.Schema({
    userid:{
        type:String,
         required:true
    },
    que1: {
        type: String,
        required: true
    },
    que2: {
        type: String,
        required: true
    },
    que3: {
        type: String,
        required: true
    },
    que4: {
        type: String,
        required: true
    },
    que5: {
        type: String,
        required: true
    },
    que6: {
        type: String,
        required: true
    },
    que7: {
        type: String,
        required: true
    },
    que8: {
        type: String,
        required: true
    },
    que9: {
        type: String,
        required: true
    },
    que10: {
        type: String,
        required: true
    },
    que11: {
        type: String,
        required: true
    },
    que12: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('slamSchema',slamSchema)