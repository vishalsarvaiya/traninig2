const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
const mysql = require('mysql');


var con = mysql.createConnection({
  host: '192.168.2.8',
  user: 'trainee',
  password: 'trainee@123',
  database: 'trainee'
});

con.connect(function (err) {
  if (err) console.log(err)
  else
    console.log("Database Connected")
});


app.get("/", async (req, res) => {
  try {
    const sql = `select * from vishal_category`
    con.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.json(result);
        console.log(result);
      }
    })
  } catch (err) {
    res.status(400).send(err);
  }
})


app.post("/category", async (req, res) => {
  const name = req.body.incategory;
  const parent_id = req.body.id;

  const sql = `insert into vishal_category(category,parent_id) values("${name}","${parent_id}")`

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log("inserted");
  });
})


app.get("/getparent", async (req, res) => {
  try {
    const sql = `select * from vishal_category where parent_id=0`
    con.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.json(result);
        console.log(result);
      }
    })
  } catch (err) {
    res.status(400).send(err);
  }
})
app.get("/getchild", async (req, res) => {
  try {
    const id = req.query.id;
    console.log(req.query)
    const sql = `select * from vishal_category where parent_id=${id}`
    con.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.json(result);
        console.log(result);
      }
    })
  } catch (err) {
    res.status(400).send(err);
  }
})



app.get("/deleteDatas", (req, res) => {
  try {
    console.log("in delete")
    console.log(req.query.id);
    let Query = `delete from vishal_category where recid="${req.query.id}"`
    con.query(Query, (err, result) => {
      if (err) throw err;
      else {
        con.query(
          `delete from vishal_category where parent_id="${req.query.id}"`,
          (err, result) => {
            if (err) throw err;
            console.log(result);
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/editDatas", async(req, res) => {
  try {
    console.log(req.query) 
    const id = req.query.id;
    const value = req.query.editedvalue;
    con.query(
      `update vishal_category set category= "${value}" where recid="${id}"`,
      (err, result) => {
        if (err) throw err;
        
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.listen(8000, () => {
  console.log("app is listening on port 8800");
})
