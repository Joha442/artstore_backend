var express = require("express");
var router = express.Router();
var con = require("../database");

router.get("/users", function (req, res) {
  var user_id = req.query.user_id;
  if (!user_id) {
    con.query("SELECT user_id, user_username, user_level FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        data: result,
      });
    });
    return;
  }
  con.query("SELECT user_id, user_username, user_level FROM users WHERE user_id=?", [user_id], function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.log(result);
    res.json({
      data: result,
    });
  });
});

router.post("/register", function (req, res) {
  var user_username = req.body.username;
  var user_password = req.body.password;

  con.query("SELECT * FROM users WHERE user_username=?", [user_username], function (err, result, fields) {
    if (result.length > 0) {
      res.json({
        result: "ERROR",
        message: "username already taken",
      });
    }
    return;
  });

  con.query(
    "INSERT INTO users (user_username, user_password, user_level) VALUES (?,?,?)",
    [user_username, user_password, 2],
    function (err, result, fields) {
      if (err) throw err;
      res.json({
        result: "OK",
        message: "user created successfuly",
      });
    }
  );
});

router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  con.query("SELECT *FROM users WHERE user_username=?", [username], function (err, result, fields) {
    if (!result.length) {
      res.json({
        result: "ERROR",
        message: "Invalid credentials",
      });
    } else if (result[0].user_password == password) {
      res.json({
        data: {
          user_id: result[0].user_id,
          username: result[0].user_username,
          userLevel: result[0].user_level,
        },
      });
    } else {
      res.json({
        result: "ERROR",
        message: "Invalid credentials",
      });
    }
  });
});

router.delete("/users", function (req, res) {
  var user_id = req.body.user_id;
  if (!user_id) {
    con.query("SELECT *FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        data: result,
      });
    });
    return;
  }
  con.query("DELETE FROM users WHERE user_id=?", [user_id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      result: "OK",
    });
  });
});

router.get("/user/:id", (req, res) => {
  con.query("SELECT * FROM users where user_id=2", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      data: result,
    });
  });
});

module.exports = router;
