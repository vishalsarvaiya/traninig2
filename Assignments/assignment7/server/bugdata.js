const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// const dateTime = require("date-and-time");
// const format = require("dateformat");



var mysql = require('mysql');
var con = mysql.createConnection({
    host: '192.168.2.8',
    user: 'trainee',
    password: 'trainee@123',
    database: 'trainee'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
}
);

app.post('/bugdata', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const assignee = req.body.assignee;

    let date = new Date();
    // date.setDate(date.getDate() + 1)
    const currentDate = date.toJSON().slice(0, 10);
    // currentDate = currentDate +1;

    const Time = date.toLocaleTimeString();
    console.log("time",Time)

    const sql = `insert into vishalBugData(title,description,time,date,assignee) 
    values("${title}","${description}", "${Time}","${currentDate}" ,"${assignee}")`

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        //    resolve(result);
        console.log("inserted"); 
    });
})

app.get('/showdata', (req, res) => {
    const sql = 'select * from vishalBugData'
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            result = result.map((item) => {
                console.log(item.left_days)
                console.log("date : ", item.date)
                const date = new Date();
                ld = date.getDate();
                console.log(item.date);
                ld = date.getDate() - item.date.getDate();
                // ld=  Math.ceil((date.getDate()- item.date.getDate()))/(1000*60*60*24); 
                //ld=  Math.ceil((date.getTime()- item.date.getTime())/(1000*60*60*24)); 
                //item.left_days =  Math.ceil((date.getTime()- item.date.getTime())/(1000*60*60*24)); 
                item.left_days = 3 - ld;
                return item;
            })
            res.json(result);
        }
    })
})

app.listen(8000, () => {
    console.log("running on 8000");
})
