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
	var data = {};
    data.title = "This is title from server!";
    data.message = "This is message from server!";
	res.send(JSON.stringify(data));
});

// Start server
app.listen(port, function(){
	console.log("Start server at port " + port + " ...");
});


// DTW
var DTW = require('dtw');

var nodeDTW = function() {
	
	console.log("Start DTW ...");
	var normalArrayRGB_01 = Array.prototype.slice.call(rgb);
	var normalArrayRGB_02 = Array.prototype.slice.call(rgb);
	console.log(normalArrayRGB);
	var s = normalArrayRGB;
	var t = normalArrayRGB;
	var dtw = new DTW();
	var cost = dtw.compute(s, t);
	var path = dtw.path();
	console.log('Cost: ' + cost);
	console.log('Path: ');
	console.log(path);
};