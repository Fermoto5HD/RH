const 	fs =          require('fs'),
		express =     require('express'),
		router =      express.Router(), 
		bodyParser =  require('body-parser');

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
		.get('/now', function(req, res) {
			const week_open = [1, 2, 3, 4, 5];
			const hours = {
				from: [09, 00],
				to: [18, 00]
			};

			const d = new Date();
			const date = {
				day_position: d.getDay(),
				day: d.getDate(),
				month: d.getMonth() + 1,
				year: d.getFullYear()
			}
			const time = {
				hour: d.getHours(),
				day: d.getMinutes(),
				month: d.getSeconds()
			}

			let result = null;

			/* Condicional provisorio por apertura de local. */
			if (((date.day < 15) && (date.month === 6)) && (date.year === 2018)) {
				result = {
							class_element: 'closed',
							status: 'Cerrado',
							message: 'Abriremos a partir del viernes 15/06/18 desde las 9hs. ¡Te esperamos!',
							cta: [
								{
									class_element: 'btn btn-outline-light',
									string: 'Ubicación',
									link: '#location'
								}
							]
						};
			}
			else
			{
				if (week_open.find(day => day === date.day_position)) {
					if (time.hour > hours.from[0] && time.hour < hours.to[0]) {
						result = {
							class_element: 'open',
							status: 'Abierto',
							message: 'Estamos atendiendo hasta las ' + hours.to[0] + 'hs.',
							cta: [
								{
									class_element: 'btn btn-outline-light',
									string: 'Ubicación',
									link: '#location'
								},
								{
									class_element: 'btn btn-outline-light',
									string: 'Llamar',
									link: 'tel:45049106'
								}
							]
						};
					} else {
						result = {
							class_element: 'closed',
							status: 'Cerrado',
							message: 'Atendemos de Martes a Sábados de ' + hours.from[0] + ' a ' + hours.to[0] + 'hs.',
							cta: [
								{
									class_element: 'btn btn-outline-light',
									string: 'Contacto',
									link: '#contact'
								}
							]
						};
					}
				} else {
					result = {
						class_element: 'closed',
						status: 'Cerrado',
						message: 'Atendemos de Martes a Sábados de ' + hours.from[0] + ':' + hours.from[1] + ' a ' + hours.to[0] + ':' + hours.to[1] + 'hs.',
						cta: [
							{
								class_element: 'btn btn-outline-light',
								string: 'Contacto',
								link: '#contact'
							}
						]
					};
				}
			}


			res.status(200).json(result);
      		return;
		});

	return router;
}