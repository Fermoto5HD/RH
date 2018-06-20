const 	fs =          require('fs'),
		express =     require('express'),
		router =      express.Router(), 
		bodyParser =  require('body-parser'),
		home =  require('./controller-home');

module.exports = function (app) {
	// Parsers for POST data
	router
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: false }))
		.use(function(req, res, next) {
			// do logging
			console.log('Accessing to API.');
			next(); // make sure we go to the next routes and don't stop here
		})
		.get('/home', home);

	return router;
}