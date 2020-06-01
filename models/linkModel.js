const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    link:{type:String, default:"/writemyslam"}
})
module.exports = mongoose.model('linkSchema',linkSchema)