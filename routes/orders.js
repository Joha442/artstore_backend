var express = require("express");
var router = express.Router();
var con = require("../database");

router.get("/orders", function (req, res) {
  con.query("SELECT * FROM orders", function (err, result, fields) {
    if (err) {
      res.json({
        error: err.message,
      });
      return;
    }
    res.json({
      data: result,
    });
  });
});

router.post("/orders", function (req, res) {
  var ord_adress = req.body.ord_adress;
  var ord_city = req.body.ord_city;
  var ord_postcode = req.body.ord_postcode;
  var ord_country = req.body.ord_country;
  var user_id = req.body.user_id;
  var cart = req.body.cart;

  if (!ord_adress.trim()) {
    res.json({
      result: "ERROR",
      message: "Adress cannot be empty",
    });
    return;
  }

  con.query(
    "INSERT INTO orders (ord_adress, ord_city, ord_postcode, ord_country, user_id) VALUES (?,?,?,?,?)",
    [ord_adress, ord_city, ord_postcode, ord_country, user_id],
    function (err, result, fields) {
      console.log(result);
      if (err) {
        res.json({
          result: err,
        });
        return;
      }
      cart.forEach((element) => {
        con.query(
          "INSERT INTO items (ord_id, pro_id, item_price, item_quantity) VALUES (?,?,?,?)",
          [result.insertId, element.pro_id, element.pro_price, element.quantity],
          function (err, result, fields) {
            if (err) {
              throw err;
            }
          }
        );
      });
      res.json({
        result: "OK",
      });
    }
  );
});

router.delete("/orders", function (req, res) {
  var ord_id = req.body.ord_id;

  con.query("DELETE FROM items WHERE ord_id=?", [ord_id], function (err, result, fields) {
    if (err) throw err;
    con.query("DELETE FROM orders WHERE ord_id=?", [ord_id], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        result: "OK",
      });
    });
  });
});

module.exports = router;
