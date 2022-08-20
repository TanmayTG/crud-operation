const express=require('express')
const app=express()
const port=3000
require('./db/connection')
const catagory=require('./model/saved')

app.set("view engine","ejs")


app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(require('./routes'))

app.use(express.static(__dirname+'/views'))

app.listen(port,()=>{
    console.log('port is running')
})