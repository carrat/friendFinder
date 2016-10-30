// require necessary modules
var path = require('path');
// load data
var friendsData = require('../data/friends.js');

module.exports = function (app) {
// route api request for friends JSON
	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});
// post route when user submits form
	app.post('/api/friends', function(req, res) {
	//find user with closest compatability
		var comparisonScore = 0;
		var comparisonScoreChamp = 500;
		var bestMatch;

		for (i=0; i<friendsData.length; i++) {
			comparisonScore = 0;
			for (j=0; j<friendsData[i].scores.length; j++) {
				comparisonScore += Math.abs(friendsData[i].scores[j] - req.body.scores[j]);	
			}

			if (comparisonScore <= comparisonScoreChamp) {		
				comparisonScoreChamp = comparisonScore;
				bestMatch = i;
			}
		}

		friendsData.push(req.body);

		var bestFriend = friendsData[bestMatch];
		var confidence = (((40 - comparisonScoreChamp)/40)*100).toFixed(2);
		var data = {'bestFriend': bestFriend, 'score': confidence};
		// export data back to DOM
		res.json(data);
	
	});
};
