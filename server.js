var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express(); 
var PORT = process.env.PORT || 3100; 

require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

console.log(__dirname  + '/app/public');
app.use('/static', express.static(__dirname + '/app/public'));

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

