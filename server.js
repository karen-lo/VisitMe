var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var path = __dirname + '/app/views/';

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

router.use(function(req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/", router);

//app.use("*", function(req,res){
//  res.sendFile(path + "404.html");
//});

app.post("/process_post", urlencodedParser, function(req, res) {
	response = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age,
		sex: req.body.optradio
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});