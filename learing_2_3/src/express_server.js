const express = require("express");
const router_file = require('./router_file')
const app = express();
app.use('/birds', router_file);
app.get("/",(req,res)=>{
    res.send("<h1>vishal sarviya</h1>")
})
app.get("/app",(req,res)=>{
    res.send("<h1>avinash dhanani</h1>")
})
const cb0 = function (req, res, next) {
    const num1 = req.params.num1;
    const num2= req.params.num2;
    if(isNaN(num1) || isNaN(num2)){
        res.send("<h1>Number dal le bhay</h1>")
    }
    next();
}

app.get("/:num1/:num2",(cb0),(req,res)=>{
    console.log(req.params)
    const num1 = Number(req.params.num1);
    const num2= Number(req.params.num2);
    const ans = num1+num2;
    res.send(`<h1>${ans}</h1>`);
})
app.get("/mul/:num1/:num2",(cb0),(req,res)=>{
    console.log(req.params)
    const num1 = Number(req.params.num1);
    const num2= Number(req.params.num2);
    const ans = num1*num2;
    res.send(`<h1>${ans}</h1>`);
})

  
app.listen(8000,()=>{
    console.log("port is listing on 8000")
})
