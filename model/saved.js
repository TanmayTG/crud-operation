const mongoose=require('mongoose')

const catSchema=new mongoose.Schema({
    catagoryName:{
        type:String,
        required:true
    }
})
const catagory=new mongoose.model('cat',catSchema)
module.exports=catagory