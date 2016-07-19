// Server code for website
// MongoLab Cloud Server: https://mlab.com/home

var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var db;

var app = express();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var path = __dirname + '/app/views/';

// Creating static links
app.use('/public', express.static(__dirname + '/public'));
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/validator', express.static(__dirname + '/node_modules/nghuuphuoc-bootstrapvalidator-aae9288/dist/'));

// Connect to database
MongoClient.connect('mongodb://admin:visitme@ds053972.mlab.com:53972/visitme', 
	                (err, database) => {
	if(err) return console.log(err);
	db = database;

	// Create local host
	app.listen(process.env.PORT || 3000,function(){
	  console.log("Live at Port 3000");
	});
});


router.use(function(req,res,next) {
  console.log("/" + req.method);
  next();
});

// Serve index.html
router.get("/", function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/", router);

// Process form
app.post("/visitors", urlencodedParser, function(req, res) {
	response = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age,
		sex: req.body.optradio
	};

	// Save to database
	db.collection('visitors').save(response, (err, result) => {
	 	if(err) {
	 		console.log(err);
	 	} else {
			console.log("Saved to database");
		}
	});

	console.log(response);
	res.end(JSON.stringify(response));
	//res.sendFile(path + "visualize.html");
});

// Serve 404 if page not found
app.use("*", function(req,res){
  res.sendFile(path + "404.html");
});
