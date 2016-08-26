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

//try prepocessing

app.get("/agedata", function(req, res) {
	// Grab from database
	var cursor = db.collection('visitors').find();
	var ageDict = {"under 10 years old": 0, "10-20 years old": 0, "20-30 years old": 0, "30-40 years old": 0, 
		"40-50 years old": 0, "50-60 years old": 0, "60-70 years old": 0, "70-80 years old": 0, 
		"80-90 years old": 0, "90-100 years old": 0}
	var ave10 = 0, ave20 = 0, ave30 = 0, ave40 = 0, ave50 = 0, ave60 = 0, ave70 = 0, ave80 = 0, ave90 = 0, ave100 = 0;
	
	// Count all the first names
	cursor.toArray(function(err, results) {
		for(i=0; i<results.length; i++) {

			var age = results[i]["age"];

			switch(true) {
				case(age < 10):
					ave10 = ave10 * ageDict["under 10 years old"];
					ageDict["under 10 years old"] = ageDict["under 10 years old"] + 1;
					ave10 = (ave10 + age)/ageDict["under 10 years old"];
					break;
				case(age > 10 && age < 20):
					ave20 = ave20 * ageDict["10-20 years old"];
					ageDict["10-20 years old"] = ageDict["10-20 years old"] + 1;
					ave20 = (ave20 + age)/ageDict["10-20 years old"];
					break;
				case(age > 20 && age < 30):
					ave30 = ave30 * ageDict["20-30 years old"];
					ageDict["20-30 years old"] = ageDict["20-30 years old"] + 1;
					ave30 = (ave30 + age)/ageDict["20-30 years old"];
					break;
				case(age > 30 && age < 40):
					ave40 = ave40 * ageDict["30-40 years old"];
					ageDict["30-40 years old"] = ageDict["30-40 years old"] + 1;
					ave40 = (ave40 + age)/ageDict["30-40 years old"];
					break;
				case(age > 40 && age < 50):
					ave50 = ave50 * ageDict["40-50 years old"];
					ageDict["40-50 years old"] = ageDict["40-50 years old"] + 1;
					ave50 = (ave50 + age)/ageDict["40-50 years old"];
					break;
				case(age > 50 && age < 60):
					ave60 = ave60 * ageDict["50-60 years old"];
					ageDict["50-60 years old"] = ageDict["50-60 years old"] + 1;
					ave60 = (ave60 + age)/ageDict["50-60 years old"];
					break;
				case(age > 60 && age < 70):
					ave70 = ave70 * ageDict["60-70 years old"];
					ageDict["60-70 years old"] = ageDict["60-70 years old"] + 1;
					ave70 = (ave70 + age)/ageDict["60-70 years old"];
					break;
				case(age > 70 && age < 80):
					ave80 = ave80 * ageDict["70-80 years old"];
					ageDict["70-80 years old"] = ageDict["70-80 years old"] + 1;
					ave80 = (ave80 + age)/ageDict["70-80 years old"];
					break;
				case(age > 80 && age < 90):
					ave90 = ave90 * ageDict["80-90 years old"];
					ageDict["80-90 years old"] = ageDict["80-90 years old"] + 1;
					ave90 = (ave90 + age)/ageDict["80-90 years old"];
					break;
				case(age > 90 && age < 100):
					ave100 = ave100 * ageDict["90-100 years old"];
					ageDict["90-100 years old"] = ageDict["90-100 years old"] + 1;
					ave100 = (ave100 + age)/ageDict["90-100 years old"];
					break;
			}
		}

		var id = 10;
		var order = 1;
		var ageArray = [];
		var colors = ["#CC0066", "#E1514B", "#FB9F59", "#FEC574", "#EAF195", "#C7E89E", "#6CC4A4", 
			"#4D9DB4", "#4776B4", "#993399"];
		var aveAge = [ave10, ave20, ave30, ave40, ave50/10, ave60, ave70, ave80, ave90, ave100];
		var x = 0;
		for(var age in ageDict) {
			temp = {};
			temp["color"] = colors[x];
			temp["id"] = "" + id;
			temp["label"] = age;
			temp["order"] = order;
			temp["score"] = aveAge[x];
			temp["weight"] = ageDict[age]/results.length * 100;
			temp["width"] = 1;

			ageArray.push(temp);

			id += 10;
			order++;
			x++;
		}

		res.send(ageArray);
	});
});

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

app.get("/age", function(req, res) {
	res.sendFile(path + "age.html");
});

app.get("/gender", function(req, res) {
	res.sendFile(path + "gender.html");
});

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
