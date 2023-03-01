const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');

app.use(express.json());

var mysql = require('mysql');
const { response } = require('express');
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

app.get('/showdata', async (req, res) => {
    console.log(req.query.token);
    try {
        const email = await resolveToken(req.query.token);
        console.log(email);
        const sql = `select * from vishalform where email="${email}"`
        con.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                res.json(result)
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }

})

app.post('/registration', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confpassword = req.body.confpassword;

    const date = new Date();
    let dateadded = date.toJSON().slice(0, 10);

    const token = jwt.sign(email, "vishal");

    const sql = `insert into vishalform(firstname,lastname,email,password,confpassword,dateadded,token) 
    values("${firstname}","${lastname}", "${email}","${password}" ,"${confpassword}","${dateadded}","${token}")`

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        //    resolve(result);
        console.log("inserted");
        //response.redirect('/login');
    });
})

app.post('/login', (request, response) => {

    const email = request.body.email;
    const password = request.body.password;
    console.log("in login from")
    if (email && password) {
        con.query(`SELECT * FROM vishalform WHERE email="${email}" AND password="${password}"`, function (error, results) {
            console.log(results);
            if (error) {
                return response.status(400).send(error);
            }else if(results.length==0){
                return response.status(400).send("user not exists")
            }
            else {
                let jwtSecretKey = "vishal";
                let data = {
                  email: email
                }
                const token = jwt.sign(data, jwtSecretKey);
                const update_query = `update vishalform set token = "${token}" where email = "${email}"`
                con.query(update_query, function (error, result) {
                    if (error) {
                        return response.status(400).send(result);
                    }
                    response.send({ result, token });
                })
            }
        });
    } else {
        response.status(400).send('Please enter Username and Password!');
    }
})
const resolveToken = (token) => {
    console.log("token : ", token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, "vishal", function (err, decoded) {
            if (err) reject(err);
            console.log("decoded", decoded.email);
            resolve(decoded.email);
        });
    });
};

// app.get('/home', function (request, response) {
//     response.send("ok logged in");
// });


app.listen(8000, () => {
    console.log("server is running on PORT 8000");
})