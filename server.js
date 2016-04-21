var express = require('express');

// Server
var port = process.env.PORT || 3000;;
var app = express();

// Bodyparser for JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Add headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Receive request
app.post('/endpoint', function(req, res, next){

	var r1 = req.body.r1;
	var r2 = req.body.r2;
	var g1 = req.body.g1;
	var g2 = req.body.g2;
	var b1 = req.body.b1;
	var b2 = req.body.b2;
	var a1 = req.body.a1;
	var a2 = req.body.a2;

	var data = {};
    data.dtwr = nodeDTW(r1,r2);
    data.dtwg = nodeDTW(g1,g2);
    data.dtwb = nodeDTW(b1,b2);
    data.dtwa = nodeDTW(a1,a2);

	res.send(JSON.stringify(data));
});

// Start server
app.listen(port, function(){
	console.log("Start server at port " + port + " ...");
});


// DTW
var DTW = require('dtw');

var nodeDTW = function(serie1, serie2) {
	
	console.log("Start DTW ...");
	var dtw = new DTW();
	var cost = dtw.compute(serie1, serie2);
	// var path = dtw.path();
	console.log('Compute success');
	return cost;
};