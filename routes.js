const express=require('express')
const router=express.Router();
require('./db/connection')
const catagory=require('./model/saved')
const product=require('./model/savedProduct')



// router.post('/',async(req,res)=>{
//     try {
//         const Cat=new catagory({
//             catagoryName:req.body.catagoryName
//         })
//         const saved=await Cat.save()
//         res.send(saved)
//         console.log(saved)
//     } catch (error) {
//         res.send(error)
//         console.log(error)
//     }
// })

router.post('/insert',(req,res)=>{
    const PCat=new catagory({
        catagoryName:req.body.catagoryName
    })
    PCat.save((e)=>{
        if(e){
            console.log(e)
        }else{
    res.redirect('/')
        }
    })  
})

router.get('/insert',(req,res)=>{
    res.render('insert',{title:'add data'})
})

router.get('/',(req,res)=>{
    catagory.find().exec((e,cats)=>{
        if(e){
            res.send(e)
            console.log(e)
        }else{
            res.render('index',{
                title:'home page',
                cats:cats
            })
        }
    })
})

router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    catagory.findById(id,(e,cats)=>{
        if(e){
            res.redirect('/index')
        }else{
            if(cats == null){
                res.redirect('/');
            }else{
                res.render('edit',{
                    title:'Edit Catagory',
                    cats:cats
                })
            }
        }
    })
})

router.post('/update/:id',(req,res)=>{
    let id = req.params.id;
    catagory.findByIdAndUpdate(id,{
        catagoryName:req.body.catagoryName
    },(e,result)=>{
        if(e){
            res.render(e)
        }else{
            res.redirect('/');
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    let id=req.params.id;
    catagory.findByIdAndRemove(id,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log('user deleted successfully')
            res.redirect('/')
        }
    })
})

router.post('/add',(req,res)=>{
    const Product=new product({
        ProductName:req.body.ProductName,
        catagoryName:req.body.catagoryName
    })
    Product.save((e)=>{
        if(e){
            console.log(e)
        }else{
    res.redirect('/')
        }
    })  
})

router.get('/add',(req,res)=>{
    res.render('products',{title:'add product'})
})

router.get('/productTable',(req,res)=>{
    const {page=1,limit=10}=req.query;
    product.find().limit(limit*1).skip((page-1)*limit).exec((e,Products)=>{
        if(e){
            res.send(e)
            console.log(e)
        }else{
            res.render('productTable',{
                title:'home page',
                Products:Products
            })
        }
    })
})

router.get('/editProduct/:id',(req,res)=>{
    let id = req.params.id;
    product.findById(id,(e,Products)=>{
        if(e){
            res.redirect('/productTable')
        }else{
            if(Products == null){
                res.redirect('/productTable');
            }else{
                res.render('editProduct',{
                    title:'Edit Catagory',
                    Products:Products                    
                })
            }
        }
    })
})

router.post('/updateProduct/:id',(req,res)=>{
    let id = req.params.id;
    product.findByIdAndUpdate(id,{
        ProductName:req.body.ProductName,  
        catagoryName:req.body.catagoryName
    },(e,result)=>{
        if(e){
            res.render(e)
        }else{
            res.redirect('/productTable');
        }
    })
})

router.get('/deleteProduct/:id',(req,res)=>{
    let id=req.params.id;
    product.findByIdAndRemove(id,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log('product deleted successfully')
            res.redirect('/productTable')
        }
    })
})

module.exports=router