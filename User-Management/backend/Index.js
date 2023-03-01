const express = require('express')
const app = express();
const Task = require("./Routes/Task")
const User = require('./routes/Routes')
app.use(express.json())

app.use('/', User);
app.use('/',Task);

app.listen(9001,()=>{
    console.log("app is listing on port 9001")
})