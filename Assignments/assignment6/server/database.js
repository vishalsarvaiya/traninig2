const express = require('express');
const app = express();

// const cors = require('cors');
// app.use(cors());

app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.2.8",
    user: "trainee",
    password: "trainee@123",
    database: "trainee"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
}
);

app.post('/insert', (req, res) => {
    const name = req.body.name;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const language = req.body.language;
    const id = req.body.id;
    const sql = `insert into vishalmovies values("${name}","${genre}","${rating}","${language}" , "${id}")`
    con.query(sql,
    function (err, result) {
           if (err) throw err;
           console.log(result);
           res.json(result)
   });
})

app.get('/allmovies', (req, res) => {
     con.query("SELECT * FROM vishalmovies", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result)
    });
})

app.get('/highestrated', (req, res) => {
    con.query("SELECT * FROM vishalmovies order by rating desc limit 3", function (err, result) {
           if (err) throw err;
           console.log(result);
           res.json(result)
   });
})

app.put('/updaterating', (req, res) => {
    con.query("update vishalmovies set rating = 10 where genre = \"comedy\" ", function (err, result) {
           if (err) throw err;
           console.log(result);
           res.json(result)
   });
})



app.delete('/delete', (req, res) => {
    con.query("delete FROM vishalmovies order by rating limit 1", function (err, result) {
           if (err) {
            res.status(400).send(err);
           };
           console.log(result);
           res.send(
            "Movie Deleted Successfully "
           )
   });
})

app.listen(8000, () => {
    console.log("running on 8000");
})