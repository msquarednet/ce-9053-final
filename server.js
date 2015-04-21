var express = require("express");
var app = express();

app.set("view engine", "jade");

app.use(express.static(__dirname + "/client"));
app.use(function(req,res,next) {
  //res.locals.foo = Math.random().toString();
  next();
});



var paths = ["/", "/people", "/games", "/teams", "/teams/:id"];
paths.forEach(function (path) {
  app.get(path, function (req,res,next) {
    res.render("index");
  });
})

app.listen(process.env.PORT);















// app.get("/", function (req,res,next) {
//   //res.send("Howdy World");  
//   //res.send(res.locals.foo);
//   res.render("index", {data:res.locals.foo});
// });


