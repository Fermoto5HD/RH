'use strict';
const express = require('express'), 
	  path = require('path'),
	  app = express(),
      compression = require('compression'),
	  port = process.env.PORT || '3000';

app
	.use(compression())
	.use(express.static('_dist'))
	.use("/assets", express.static(__dirname + "_dist/assets"))
	.get('*', (req, res) => {
		res.status(404)
		res.sendFile(path.join(__dirname, '/404.html'))
	})
	.listen(port);

console.log('Sitio online en localhost:' + port);