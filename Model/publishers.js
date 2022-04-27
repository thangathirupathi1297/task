const mongoose=require('mongoose');


const PublishSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        require:true
    }
})
const PublishModel=mongoose.model("publish",PublishSchema)
module.exports=PublishModel