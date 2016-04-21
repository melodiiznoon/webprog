var DTW = require('dtw');

var nodeDTW = function() {
	// console.log(rgb);
	// var s = [1,1,2,3,2,0];
	// var t = [0,1,1,2,3,2,1];
	var normalArrayRGB = Array.prototype.slice.call(rgb);
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