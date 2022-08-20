const mongoose=require('mongoose')

const ProductsSchema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true
    },
    catagoryName:{
        type:mongoose.Schema.Types.String,
        ref: 'cat',
        required:false
    }
})

ProductsSchema.pre('save', async function(next){
    if(this.cat){
        try {
            const check = await cat.findById(this.catagoryName);
        } catch (error) {
            console.log(error)
        }
    }
    next();
})

const product=new mongoose.model('Product',ProductsSchema)
module.exports=product