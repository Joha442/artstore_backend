var express = require("express");
var bodyParser = require("body-parser");

var user = require("./routes/users");
var author = require("./routes/authors");
var product = require("./routes/products");
var comment = require("./routes/comments");
var order = require("./routes/orders");
var item = require("./routes/items");
var cors = require("cors");

var app = express();
var port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(user);
app.use(author);
app.use(product);
app.use(comment);
app.use(order);
app.use(item);

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(port, function () {
  console.log("app radi na portu," + port);
});
