'use strict';
const express = require('express'), 
	  path = require('path'),
	  app = express(),
	  minify = require('express-minify'),
      compression = require('compression'),
	  port = process.env.PORT || '3000';

app
	.use(compression())
	.use(minify())
	.use(express.static('_dist'))
  	.use('/api', require('./api/main')(app))
	.use("/assets", express.static(__dirname + "/assets"))
	.get('*', (req, res) => {
		res.status(404)
		res.sendFile(path.join(__dirname, '/404.html'))
	})
	.listen(port);

console.log('Sitio online en localhost:' + port);