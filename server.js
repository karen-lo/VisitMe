// Server code for website
// MongoLab Cloud Server: https://mlab.com/home
// To run nodemon: ./node_modules/.bin/nodemon server.js
// To push to heroku: git push heroku master

var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var d3 = require("d3");
var db;

var app = express();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: true});

var path = __dirname + '/app/views/';

// Creating static links
app.use('/public', express.static(__dirname + '/public'));
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jq', express.static(__dirname + '/public/vendor/jquery/dist/'));
app.use('/validator', express.static(__dirname + '/public/vendor/nghuuphuoc-bootstrapvalidator-aae9288/dist/'));
app.use('/d3', express.static(__dirname + '/public/vendor/d3/'));
app.use('/cloud', express.static(__dirname + '/node_modules/d3-cloud/build/'));

// Connect to database
MongoClient.connect('mongodb://admin:visitme@ds053972.mlab.com:53972/visitme', 
	                (err, database) => {
	if(err) return console.log(err);
	db = database;

	// Create local host
	app.listen(process.env.PORT || 3000, function(){
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
		sex: req.body.gender
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
	//res.end(JSON.stringify(response));
	res.sendFile(path + "visitorMenu.html");
});

app.get("/visitors", function(req, res) {
	res.sendFile(path + "visitorMenu.html");
})

app.get("/genderdata", function(req, res) {
	// Grab from database
	var cursor = db.collection('visitors').find();
	var genderDict = {};
	
	// Count all the first names
	cursor.toArray(function(err, results) {
		for(i=0; i<results.length; i++) {

			var gender = results[i]["sex"];

			if(gender in genderDict) {
				genderDict[gender] = genderDict[gender] + 1;
			} else {
				genderDict[gender] = 1;
			}
		}

		for(var gender in genderDict) {
			genderDict[gender] = genderDict[gender]/results.length * 100;
		}
		
		res.send(genderDict);
	});
});


app.get("/lastnamedata", function(req, res) {
	// Grab from database
	var cursor = db.collection('visitors').find();
	var lastnameDict = {};
	var lastnameArray = [];

	// Count all the first names
	cursor.toArray(function(err, results) {
		for(i=0; i<results.length; i++) {

			var lname = results[i]["lastname"];

			if(lname in lastnameDict) {
				lastnameDict[lname] = lastnameDict[lname] + 1;
			} else {
				lastnameDict[lname] = 1;
			}
		}
		//console.log(lastnameDict);
		
		// Put into an array
		for(var lname in lastnameDict) {
			var map = {
					text: lname,
					size: lastnameDict[lname]
				};
			lastnameArray.push(map);
		}

		//console.log(lastnameArray);
		res.send(lastnameArray);
	});
	
});

app.get("/firstnamedata", function(req, res) {
	// Grab from database
	var cursor = db.collection('visitors').find();
	var firstnameDict = {};
	var firstnameArray = [];

	// Count all the first names
	cursor.toArray(function(err, results) {
		for(i=0; i<results.length; i++) {

			var fname = results[i]["firstname"];

			if(fname in firstnameDict) {
				firstnameDict[fname] = firstnameDict[fname] + 1;
			} else {
				firstnameDict[fname] = 1;
			}
		}
		//console.log(firstnameDict);
		
		// Put into an array
		for(var fname in firstnameDict) {
			var map = {
				text: fname,
				size: firstnameDict[fname]
			};
			firstnameArray.push(map);
		}

		//console.log(firstnameArray);
		res.send(firstnameArray);
	});
	
});

app.get("/gender", function(req, res) {
	res.sendFile(path + "gender.html");
})

app.get("/lastname", function(req, res) {
	res.sendFile(path + "lastname.html");
});


app.get("/firstname", function(req, res) {
	res.sendFile(path + "firstname.html");
});

// Serve 404 if page not found
app.use("*", function(req,res){
  res.sendFile(path + "404.html");
});
