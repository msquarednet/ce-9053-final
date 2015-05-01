var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//DB
mongoose.connect("mongodb://localhost/BotaDB");
mongoose.connection.once("open", function () {
  console.log("Connected to BotaDB!");
});


//APP
var app = express();
app.set("view engine", "jade");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req,res,next) {
  //res.locals.foo = Math.random().toString();
  next();
});


//APP ROUTES
var paths = ["/", "/people", "/games", "/teams", "/games/edit", "/games/edit/:game_id"];
paths.forEach(function (path) {
  app.get(path, function (req,res,next) {
    res.render("index");
  });
});

app.listen(process.env.PORT);


//SCHEMAS
var PersonSchema = new mongoose.Schema({
  name: String,
  games: Array
});
var Person = mongoose.model("Person", PersonSchema);

var GameSchema = new mongoose.Schema({
  name: String,
  score: Number
});
var Game = mongoose.model("Game", GameSchema);



//APIs
//selectAll
app.get("/api/games", function(req,res,next) {
  Game.find({}).sort("name").exec(function(err,games) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(games);  //console.log(games);
  });
});
//select
app.get("/api/games/:id", function(req,res,next) {
  Game.findOne({_id: req.params.id}, function(err,game) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(game);  //console.log(game);
  });
});
//insert
app.post("/api/games", function(req,res,next) {
  Game.create(req.body, function(err,game) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(game);  //console.log(game);
  });
});
//update
app.put("/api/games/:id", function(req,res,next) {
  Game.findByIdAndUpdate(req.params.id, req.body, function(err,game) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(game);  //console.log(game);
  });
});
//delete
app.delete("/api/games/:id", function(req,res,next) {
  Game.findByIdAndRemove(req.params.id, function(err,game) {
    if (err) { res.status(500).send(err); } //console.log(err);
    res.send(game);  //console.log(game);
  });
});












// app.get("/", function (req,res,next) {
//   //res.send("Howdy World");  
//   //res.send(res.locals.foo);
//   res.render("index", {data:res.locals.foo});
// });


