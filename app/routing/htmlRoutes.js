module.exports = function(app, path) {
	// Basic route that sends the user to the survey page
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	// Basic route that sends the user to the survey page
	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});
}