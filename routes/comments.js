var express = require("express");
var router = express.Router();
var con = require("../database");

router.get("/comments", function (req, res) {
  var pro_id = req.query.pro_id;

  if (pro_id == null) {
    console.log(pro_id);
    res.json({
      result: "ERROR",
      message: "pro_id must be provided",
    });
    return;
  }

  con.query(
    "SELECT com_id, com_content, com_date, users.user_id, user_username FROM comments INNER JOIN users ON (comments.user_id=users.user_id) WHERE comments.pro_id = ?",
    [pro_id],
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        data: result,
      });
    }
  );
});
router.get("/countcomments", function (req, res) {
  var pro_id = req.query.pro_id;
  if (pro_id == null) {
    console.log(pro_id);
    res.json({
      result: "ERROR",
      message: "pro_id must be provided",
    });
    return;
  }
  con.query("SELECT COUNT (com_id) from comments WHERE comments.pro_id = ?", [pro_id], function (err, result, fields) {
    if (err) throw err;
    res.json({
      data: result[0]["COUNT (com_id)"],
    });
  });
});

router.post("/comments", function (req, res) {
  var pro_id = req.body.pro_id;
  var user_id = req.body.user_id;
  var com_content = req.body.com_content;

  if (com_content === undefined || com_content.trim().length === 0) {
    res.json({
      result: "ERROR",
      message: "Comment content cannot be empty",
    });
    return;
  }

  con.query(
    "INSERT INTO comments (user_id, pro_id, com_content) VALUES (?,?,?)",
    [user_id, pro_id, com_content],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        result: "OK",
      });
    }
  );
});
router.delete("/comments", function (req, res) {
  var com_id = req.query.com_id;

  con.query("DELETE FROM comments WHERE com_id=?", [com_id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      result: "OK",
    });
  });
});
router.put("/comments", function (req, res) {
  var com_id = req.query.com_id;
  console.log(com_id);
  var com_content = req.body.com_content;

  if (!com_id) {
    res.json({
      result: "ERROR",
      message: "com_id must be provided",
    });
    return;
  }

  con.query("UPDATE comments SET com_content=? WHERE com_id=?", [com_content, com_id], function (err, result, fields) {
    if (err) throw err;
    res.json({
      data: "OK",
    });
  });
});

module.exports = router;
