const request = require('request');
const express = require("express");
const router_file = require('./router_file');
const { response } = require('express');
const app = express();
app.use('/birds', router_file);
app.get("/",(req,res)=>{
    request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  res.send(body)
});
})

  
app.listen(8000,()=>{
    console.log("port is listing on 8000")
})

