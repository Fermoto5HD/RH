'use strict';
var express = require('express'), 
		app = express(); 

app.use(express.static('pagina'));

app.listen(3000, function() {
	console.log('Sitio levantado en localhost:3000');
});