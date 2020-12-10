var express = require("express");
var router = express.Router();
var con = require("../database");

router.get("/products", function (req, res) {
  var pro_id = req.query.pro_id;
  if (!pro_id) {
    con.query("SELECT *FROM products INNER JOIN authors ON (products.aut_id=authors.aut_id)", function (
      err,
      result,
      fields
    ) {
      if (err) throw err;
      res.json({
        data: result,
      });
    });
    return;
  }
  con.query(
    "SELECT *FROM products INNER JOIN authors ON (products.aut_id=authors.aut_id) WHERE products.pro_id = ?",
    [pro_id],
    function (err, result, fields) {
      if (err) throw err;
      if (!result.length) {
        res.json({ error: "No product with provided id" });
      }
      res.json({
        data: result,
      });
    }
  );
});

router.post("/products", function (req, res) {
  var pro_title = req.body.pro_title;
  var pro_description = req.body.pro_description;
  var pro_price = req.body.pro_price;
  var pro_image = req.body.pro_image;
  var aut_id = req.body.aut_id;


  if (pro_title === undefined) {
    res.json({
      result: "ERROR",
      message: "Title must be provided",
    });
    return;
  }
  

  con.query(
    "INSERT INTO products (pro_title, pro_description,pro_price, pro_image, aut_id) VALUES (?,?,?,?,?)",
    [pro_title, pro_description, pro_price, pro_image, aut_id],
    function (err, result, fields) {
      if (err) throw err;
      else {
        res.json({
          result: "OK",
        });
      }
    }
  );
});

router.delete("/products", function (req, res) {
  var pro_id = req.query.pro_id;

  con.query("SELECT *FROM products WHERE pro_id=?", [pro_id], function (err, result, fields) {
    if (err) throw err;
    if (result.length) {
      con.query("DELETE FROM comments WHERE pro_id=?", [pro_id], function (err, result, fields) {
        if (err) throw err;
        con.query("DELETE FROM products WHERE pro_id=?", [pro_id], function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json({
            result: "OK",
          });
        });
      });
    } else res.json({ result: "No Such Product" });
  });
  return;

  con.query("DELETE FROM comments WHERE pro_id=?", [pro_id], function (err, result, fields) {
    if (err) throw err;
    con.query("DELETE FROM products WHERE pro_id=?", [pro_id], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        result: "OK",
      });
    });
  });
});

module.exports = router;
