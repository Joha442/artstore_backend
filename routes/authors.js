var express = require("express");
var router = express.Router();
var con = require("../database");

router.get("/authors", function (req, res) {
  var aut_id = req.query.aut_id;
  if (!aut_id) {
    con.query("SELECT *FROM authors", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        data: result,
      });
    });
    return;
  }
  con.query("SELECT *FROM authors WHERE aut_id=?", [aut_id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      data: result,
    });
  });
});

router.post("/authors", function (req, res) {
  var fullName = req.body.fullName;
  var description = req.body.description;

  con.query("INSERT INTO authors (aut_fullName, aut_description) VALUES (?,?)", [fullName, description], function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    res.json({
      result: "OK",
    });
  });
});

router.delete("/authors", function (req, res) {
  var aut_id = req.body.aut_id;

  con.query("DELETE  FROM products WHERE aut_id=?", [aut_id], function (err, result, fields) {
    if (err) throw err;
    con.query("DELETE  FROM authors WHERE aut_id=?", [aut_id], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        result: "OK",
      });
    });
  });
});

module.exports = router;
