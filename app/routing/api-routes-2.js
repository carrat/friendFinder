//Your api-routes.js file should contain two routes:

//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
//A POST routes /api/friends. This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic.


//Determine the user's most compatible friend using the following as a guide:

//Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
//With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
//Example:
//User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
//User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
//Total Difference: 2 + 1 + 2 = 5
//Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
//The closest match will be the user with the least amount of difference.
//Once you've found the current user's most compatible friend, display the result as a modal pop-up.

//The modal should display both the name and picture of the closest match.


var friendsData = require('../data/friends.js');

if (err) throw err;


//Create Express Router


//Create a router file named birds.js in the app directory, with the following content:

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
// Then, load the router module in the app:

var birds = require('./birds');

app.use('/birds', birds);
//The app will now be able to handle requests to /birds and /birds/about, 
//as well as call the timeLog middleware function that is specific to the route.







module.exports = function (app) {

	app.get('/api/friends', function (req, res) {
		res.json(friendsData);
	});

	app.post('/api/friends', function (req, res) {

		// find new user's scores

		//find user with closest compatability
		var comparisonScore = 0;
		var comparisonScoreChamp = 500;
		var bestMatch;

		for (i=0; i<friendsData.length; i++) {
			for (j=0; j<friendsData[i].scores.length; j++) {
				comparisonScore += Math.abs(friendsData[i].scores[j] - req.body[j]);
				if (comparisonScore <= comparisonScoreChamp) {
					comparisonScoreChamp = comparisonScore;
					bestMatch = i;
				}
			}
		}

		friendsData.push(req.body);

		res.json(friendsData[bestMatch]);
		
	});
};
