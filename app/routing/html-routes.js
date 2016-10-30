// require necessary modules
var path = require('path');

module.exports = function (app) {
// get routes for HTML files
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
};