const mongoose = require('mongoose')


const slamSchema = new mongoose.Schema({

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
    

})

module.exports = mongoose.model('slamSchema',slamSchema)