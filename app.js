// load the things we need
var express = require('express');
var ejs = require('ejs');
var app = express();
var cors = require('cors');
var http = require('http');
var path = require('path');
var fs = require('fs');
var os = require('os');

// var directory;
var base = '';
// var base = 'Prod';
if (process.env['LAMBDA']){
  app.set('base', '/Prod')
  base = '/Prod';
}
// else{
//   directory = '';
// }
// var directory = '';
// var directory = 'Prod/';
var location = '/views/src/';

app.use(cors());
// set the view engine to ejs
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('pages/index.html', {baseURL:base});
	// res.render('pages/index.html');
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about.html', {baseURL:base});
	// res.render('pages/about.html');
});

app.use(express.static(__dirname + location));
// 404
app.get('*', function(req, res){
	res.render('pages/404.html', {baseURL:base});
	// res.render('pages/404.html');
	});
	
app.listen(8080);
console.log('8080 is the magic port');
console.log((process.env['LAMBDA']) !== undefined);
module.exports = app;