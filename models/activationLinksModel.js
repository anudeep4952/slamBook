const mongoose =require('mongoose')

const activationLinksSchema=new mongoose.Schema({
    activationLink: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
})

module.exports=mongoose.model("activationLinksSchema",activationLinksSchema)