'use strict';
const express = require('express'), 
	  path = require('path'),
	  app = express(); 

app
	.use(express.static('_dist'))
	.use("/assets", express.static(__dirname + "/assets"))
	.get('*', (req, res) => {
		res.status(404)
		res.sendFile(path.join(__dirname, '/404.html'))
	})
	.listen(3000, function() {
		console.log('Sitio online en localhost:3000');
	});