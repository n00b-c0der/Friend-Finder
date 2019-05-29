var fs = require('fs');
var friends = require('../data/friends');

module.exports = function(app, path) {
	// Display all available friends
	app.get("/api/friends", function(req, res) {
		res.json(friends);
		// fs.readFile("app/data/friends.js", "utf8", function(err, data) {
		// 	if (err) {
		// 		return console.log(err);
		// 	}

		// 	else {
		// 		res.json(JSON.parse(data));
		// 	}
		// });
	});

	// Save the incoming result & determine the correct match
	app.post("/api/friends", function(req, res) {

		// This will be the returned closest match object.
		var returnMe = [];

		// postResponse is a string of JSON information
		var postResponse = JSON.stringify(req.body);
		console.log(postResponse);

		fs.readFile('app/data/friends.js', function (data) {
			// Read the existing array
			
		    // Store the difference in values
		    var closestMatch = 0;
		    var matchScore = 999999999999999;

		    // Loop through the file to find the closest match
		    for (var i = 0; i < friends.length; i++) {
		    	var spaceBetween = 0;
		    	for (var j = 0; j < friends[i]['answers[]'].length; j++) {
		    		spaceBetween += Math.abs((parseInt(req.body['answers[]'][j]) - parseInt(friends[i]['answers[]'][j])));
				}

				// If the space between the current listing is the closest to the user, update the closestMatch
				if(spaceBetween <= matchScore) {
					matchScore = spaceBetween;
					closestMatch = i;
				}
			
		    }

		    console.log("Closest match: " + friends[closestMatch]);

		    returnMe.push(friends[closestMatch]);

		    // Add the new person to the existing array
				friends.push(JSON.parse(postResponse));
				console.log(friends);

		    // Push back the entire updated result immediately
		    fs.writeFile("../data/friends.js", JSON.stringify(friends), function(err) {
					if(err) {
						return console.log(err);
					}
					console.log('success');
				});
			
				res.send(returnMe[0]);
		 });
	});
}
