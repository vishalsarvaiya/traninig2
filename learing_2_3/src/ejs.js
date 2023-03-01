const request = require('request');
const express = require("express");
const router_file = require('./router_file');
const { response } = require('express');

const app = express();
app.set('view engine', 'ejs');
app.get('/from',(req,res)=>{
    res.render("home")
});



  
app.listen(8000,()=>{
    console.log("port is listing on 8000")
})

