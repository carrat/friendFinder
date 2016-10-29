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

module.exports = function (app) {

	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});

	app.post('/api/friends', function(req, res) {

		// find new user's scores

		//find user with closest compatability
		var comparisonScore = 0;
		var comparisonScoreChamp = 500;
		var bestMatch;
		console.log("Check");
		console.log(req.body);

		for (i=0; i<friendsData.length; i++) {
			for (j=0; j<friendsData[i].scores.length; j++) {

				console.log("First Score: " + friendsData[i].scores[j]);
				
				console.log(req.body.scores[j]);
				comparisonScore += Math.abs(friendsData[i].scores[j] - req.body.scores[j]);
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
