const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
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
app.get("/setCategory", async (req, res) => {
  try {
    let sqlQuery;
    if (req.query.catType == "parent") {
      sqlQuery = `insert into vishal_category (category) value ("${req.query.catName}")`;
    } else {
      sqlQuery = `insert into vishal_category (category,parent_id) 
     value ("${req.query.catName}","${req.query.subCatgry}")`;
    }
    con.query(sqlQuery, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/displayCategory", (req, res) => {
  try {
    con.query("select * from vishal_category", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/allCategories", async (req, res) => {
  try {
    con.query("select * from vishal_category", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log("error in allcategories api");
  }
});
app.get("/pdata", (req, res) => {
  try {
    con.query(
      "select * from vishal_category where parent_id = 0",
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log("parent data error");
  }
});
app.get("/cdata", (req, res) => {
  try {
    con.query(
      `select * from vishal_category where parent_id="${req.query.id}" `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log("child data error");
  }
});
app.get("/deleteDatas", (req, res) => {
  try {
    console.log(req.query);
    let Query = `delete from vishal_category where recid="${req.query.id}"  `;
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
app.get("/editDatas", (req, res) => {
  try {
    const id = req.query.data.recid;
    console.log(req.query.edit);
    con.query(
      `update vishal_category set category="${req.query.edit}" where recid="${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.listen(5000, () => {
  console.log("server is running...");
});
