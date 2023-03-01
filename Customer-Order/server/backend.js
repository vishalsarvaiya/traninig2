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

app.get('/products', async (req, res) => {
    console.log(req.query.token);
    try {
        const email = await resolveToken(req.query.token);
        console.log(email);
        const sql = `select * from vishal_product`
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
    const confirmpassword = req.body.confirmpassword;
    const mobilenumber = req.body.mobilenumber;
    const gender = req.body.gender;
    const address = req.body.address;
    const dob1 = (req.body.dob).slice(0,10);
    const dob = dob1;

    const token = jwt.sign(email, "vishal");

    const sql = `insert into vishal_customer(firstname,lastname,email,password,confirmpassword,mobilenumber,address,gender,dob,accesstoken) 
    values("${firstname}","${lastname}", "${email}","${password}" ,"${confirmpassword}", "${mobilenumber}", "${address}", "${gender}" , "${dob}" ,"${token}")`

    con.query(sql, function (err, result) {
        if (err) res.status(400).send("error ");
        console.log(result);
        //resole(result);
        console.log("inserted");
        res.status(200).send("sucessfully inserted")
    });
})

app.post('/update', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const mobilenumber = req.body.mobilenumber;
    const gender = req.body.gender;
    const address = req.body.address;
    const dob1 = (req.body.dob).slice(0,10);
    const dob = dob1;

    const token = jwt.sign(email, "vishal");

    const sql = `update vishal_customer set firstname = "${firstname}",lastname = "${lastname}",gender = "${gender}",
    mobilenumber = "${mobilenumber}", address = "${address}",  dob = "${dob}" where email = "${email}"`;
    
    // (firstname,lastname,email,password,confirmpassword,mobilenumber,address,gender,dob,accesstoken) 
    // values("${firstname}","${lastname}", "${email}","${password}" ,"${confirmpassword}", "${mobilenumber}", "${address}", "${gender}" , "${dob}" ,"${token}")`

    con.query(sql, function (err, result) {
        if (err) res.status(400).send("error ");
        console.log(result);
        //resole(result);
        console.log("updated");
        res.status(200).send("sucessfully updated")
    });
})


app.get("/profile", async(req,res) => {
    const email = await resolveToken(req.query.token);
    const token = req.query.token;
    console.log(req.query)
    // res.status(200).send("avinash")
    if(token) {
        con.query(`select * from vishal_customer where email = "${email}"`,function(error,result) {
            if(error){
                console.log(error)
                return res.status(400).send(error);
            }
                else{
                    if(token ==  result[0].accesstoken){
                        console.log("from server",result[0].accesstoken);
                        res.status(200).send(result[0]);
                        console.log("token matched")
                    }else{
                        res.status(401).send("unauthorized user");
                        console.log("unauthorized user");
                    }
                }
        })
    }
})


app.post('/login', (request, response) => {

    const email = request.body.email;
    const password = request.body.password;
    console.log("in login from")
    if (email && password) {
        con.query(`SELECT * FROM vishal_customer WHERE email="${email}" AND password="${password}"`, function (error, results) {
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
                const update_query = `update vishal_customer set accesstoken = "${token}" where email = "${email}"`
                con.query(update_query, function (error, result) {
                    if (error) {
                        return response.status(400).send(result);
                    }
                    response.send({ result, token });
                    console.log("login success")
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


app.listen(8000, () => {
    console.log("server is running on PORT 8000");
})