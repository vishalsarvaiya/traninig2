const express = require('express');
const app = express();
const mysql = require('mysql');

const cors = require('cors');
const { response } = require('express');
app.use(cors());

app.use(express.json());


var con = mysql.createConnection({
    host: '192.168.2.8',
    user: 'trainee',
    password: 'trainee@123',
    database: 'trainee'
});

con.connect( function(err){
    if(err) console.log(err)
    else
    console.log("Database Connected")
});

app.get("/employee", async(req,res) => {
    try{
        const sql = `select * from vishal_employee where status = 1`
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.json(result);
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})


app.get("/worklocation", async(req,res) => {
    try{
        const sql = `select address from vishal_location`
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.json(result);
                console.log(result);
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})

app.get("/showhr", async(req,res) => {
    try{
        const sql = `select * from vishal_hr where status = 1`
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.send(result);
                // res.json(result);
                console.log(result)
                console.log("hello")
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})

app.get("/showlocation", async(req,res) => {
    try{
        const sql = `select * from vishal_location`
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.send(result);
                // res.json(result);
                console.log(result)
                console.log("hello")
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})


app.get("/update", async(req,res) => {
    try{
        const eid = req.query.eid;
        console.log(eid);
        const sql = `select * from vishal_employee
        where eid = "${eid}"`
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.json(result);
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})
app.post('/updatesetdata', (req, res) => {
    const eid = req.body.eid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const contactno = req.body.contactno;
    const homeaddress = req.body.homeaddress;
    const worklocation = req.body.worklocation;
    const email = req.body.email;

    const sql = `update vishal_employee set firstname = "${firstname}", lastname = "${lastname}", 
    contactnumber = "${contactno}",homeaddress = "${homeaddress}", worklocation = "${worklocation}",
    email = "${email}" where eid = "${eid}"`
    
    con.query(sql,function (err, result) {
        
           if (err) throw err;
           console.log(result);
        // resolve(result);
           console.log("updated");
           res.json(result); });
})

app.get("/hrupdate", async(req,res) => {
    try{
        const eid = req.query.eid;
        console.log(eid);
        const sql = `select * from vishal_hr as hr inner join vishal_employee as emp
        on hr.eidcommon=emp.eidcommon
        where hr.eid = "${eid}" `
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.json(result);
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})
app.post('/hrupdatesetdata', (req, res) => {
    const eid = req.body.eid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const socialsn = req.body.socialsn;
    const salary = req.body.salary;
   

    const sql = `update vishal_hr set
    socialsecurityno = "${socialsn}",salary = "${salary}" where eid = "${eid}"`
    
    con.query(sql,function (err, result) {
           if (err) throw err;
           console.log(result);
        // resolve(result);
           console.log("updated");
           res.json(result); });
})


app.get("/updatelocation", async(req,res) => {
    try{
        const buildingid = req.query.buildingid;
        console.log(buildingid);
        const sql = `select * from vishal_location 
        where buildingid = "${buildingid}" `
        con.query(sql,(err,result) => {
            if(err)
            {
                throw err;
            }
            else{
                res.json(result);
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
})
app.post('/updatesetlocation', (req, res) => {
    const buildingid = req.body.buildingid;
    const blocation = req.body.blocation;
    const address = req.body.address;
    const zipcode = req.body.zipcode;
    const manager = req.body.manager;
   

    const sql = `update vishal_location set
    buildingid = "${buildingid}", companylocation = "${blocation}" ,address = "${address}",
    zipcode = "${zipcode}" , manager = "${manager}" where buildingid = "${buildingid}"`
    
    con.query(sql,function (err, result) {
           if (err) throw err;
           console.log(result);
        // resolve(result);
           console.log("updated");
           res.json(result); });
})


app.post('/addempdata', (req, res) => {
    const empid = req.body.empid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const contactno = req.body.contactno;
    const homeaddress = req.body.homeaddress;
    const worklocation = req.body.worklocation;
    const email = req.body.email;
    const socialsn = req.body.socialsn;
    const salary = req.body.salary;
   

    const sql = `insert into vishal_employee(eid,firstname,lastname,contactnumber,homeaddress,worklocation,email,eidcommon)
    values("${empid}","${firstname}","${lastname}", "${contactno}","${homeaddress}" ,"${worklocation}","${email}","${empid}")`

    const hrsql = `insert into vishal_hr(eid,socialsecurityno,salary,eidcommon)
    values("${empid}","${socialsn}", "${salary}","${empid}")`

    con.query(sql,function (err, result) {
           if (err) throw err;
           console.log(result);
           console.log("inserted");
   });

    con.query(hrsql, function (err2, result2) {
        if (err2) throw err2;
        console.log(result2);
        //    resolve(result);
        console.log("inserted");
        res.json(result2);
    });
})


app.post('/addlocation', (req, res) => {
    const buildingid = req.body.buildingid;
    const companylocation = req.body.companylocation;
    const address = req.body.address;
    const zipcode = req.body.zipcode;
    const manager = req.body.manager;
   
    const sql = `insert into vishal_location(buildingid,companylocation,address,zipcode,manager)
    values("${buildingid}","${companylocation}","${address}", "${zipcode}","${manager}")`

    con.query(sql,function (err, result) {
           if (err) throw err;
           console.log(result);
           console.log("inserted");
           res.send(result);
   });
})
app.delete("/empdelete",(req,res) => {
    const id = req.query.eid;

    
    const sql2 = `update vishal_hr set status=0 where eid = "${id}"`
    con.query(sql2, function(err,result) {
        if(err) throw err;
        console.log("deleted",id);
    })

    const sql = `update vishal_employee set status = 0 where eid = "${id}"`
    con.query(sql, function(err,result) {
        if(err) throw err;
        console.log("deleted",id);
        res.json(result);
    })

})


app.listen(8000,()=>{
    console.log("listing on 8000")
})