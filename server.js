// load necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// start express instance
var app = express(); 
var PORT = process.env.PORT || 3100; 

// use parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.raw());

// require router scripts
require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);

// target static files
app.use('/static', express.static(__dirname + '/app/public'));

//listen
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

