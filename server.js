var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express(); 
var PORT = 3100; 

require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


app.use('/static', express.static('app'));

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

