var express = require("express");
var router = express.Router();
var con = require("../database");

router.get("/items", function (req, res) {
  var item_id = req.query.item_id;
  if (!item_id) {
    con.query("SELECT * FROM items", function (err, result, fields) {
      if (err) throw err;
      res.json({
        data: result,
      });
    });
  }
  con.query(
    "SELECT * FROM items INNER JOIN products ON (items.pro_id=products.pro_id) INNER JOIN orders ON (items.ord_id=orders.ord_id) WHERE item_id=?",
    [item_id],
    function (err, result, fields) {
      if (err) throw err;
      if (!result.length) {
        res.json({ error: "No item with provided id" });
      }
      res.json({
        data: result,
      });
    }
  );
});

router.post("/items", function (req, res) {
  var ord_id = req.body.ord_id;
  var pro_id = req.body.pro_id;
  var item_price = req.body.item_price;
  var item_quantity = req.body.item_quantity;

  if (pro_id === undefined) {
    res.json({
      result: "ERROR",
      message: "pro_id must be provided",
    });
    return;
  }

  con.query(
    "INSERT INTO items (ord_id, pro_id, item_price, item_quantity) VALUES (?,?,?,?)",
    [ord_id, pro_id, item_price, item_quantity],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        result: "OK",
      });
    }
  );
});

module.exports = router;
