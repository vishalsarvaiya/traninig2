const express = require('express')
const app = express();

const User = require('./routes/Routes')
app.use(express.json())

app.use('/', User)