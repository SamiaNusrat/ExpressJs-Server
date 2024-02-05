const http=require('http')
const fs=require('fs')
const express = require('express')
app=express();
const multer=require('multer')

//Creating Storage
let storage = multer.diskStorage({
    destination: function (req,file,callBack){
        callBack(null,'./uploads')
    },
    filename: function (req,file,callBack){
        callBack(null,file.originalname)
    }
})
//Creating Server

app.get("/",function(req,res){
    res.send("This is Home Page")
})

app.get("/about",function(req,res){
    res.send("This is About Page")
})

app.get("/contact",function(req,res){
    res.send("This is Contact Page")
})

fs.writeFile('demo.txt','Hello World',function (err){
    if(err){console.log("Error")}
    else{console.log("Success")}
})

let upload=multer({storage:storage}).single('myfile')
app.post('/',function (req,res)
{
    upload(req,res,function (err){
        if(err){
            res.end("File Upload Failed")
        }
        res.end("File Upload Success")
    })
})

app.listen(5500,function (){console.log("Server Running...")})