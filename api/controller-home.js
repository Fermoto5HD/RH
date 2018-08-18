module.exports = function(req, res) {
	let response = {
		'cover': coverHome(),
		'shop': shopStatus()
	}

	res.status(200).json(response);
	return;
};

function coverHome() {
	return {
		'image': 'assets/img/cover-teaser.jpg',
		'video': null,
		'title': "Factor RH Creativo",
		'lead': '¡Bienvenidos!'
	}
}

function shopStatus() {
	const week_open = [2, 3, 4, 5, 6];
	const hours = {
		from: [09, 30],
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

	const date_str = date.day + '/' + date.month;

	let result = null;

	let when_opens = 'el próximo martes';
	if (week_open.find(day => day === date.day_position+1)) {
		when_opens = 'mañana';
	}

	/* Condicional provisorio hasta que terminen de mudarse. */
	if ((date.month < 7) && (date.year === 2018)) {
		result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: 'Aún estamos en construcción, pronto volveremos a abrir.'
				};
	}
	else if ('18/06' === date_str) {
		result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: 'Hoy es feriado! Abriremos ' + when_opens + ' en el horario de siempre.'
				};
	}
	else if ('09/07' === date_str) {
		result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: 'Hoy es feriado por la Independencia de nuestro país! Abriremos ' + when_opens + ' en el horario de siempre.'
				};
	}
	else if ('25/12' === date_str) {
		result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: '¡Feliz navidad! Abriremos ' + when_opens + ' en el horario de siempre.'
				};
	}
	else if ('01/01' === date_str) {
		result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: '¡Feliz año nuevo! Abriremos ' + when_opens + ' en el horario de siempre.'
				};
	}
	else
	{
		if (week_open.find(day => day === date.day_position)) {
			if (time.hour >= hours.from[0] && time.hour < hours.to[0]) {
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
			} else if (time.hour < hours.from[0]) {
				result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: 'Hoy atendemos de ' + hours.from[0] + ':' + hours.from[1] + ' a ' + hours.to[0] + 'hs.',
					cta: [
						{
							class_element: 'btn btn-outline-light',
							string: 'Contacto',
							link: '#contact'
						}
					]
				};
				/* Condicional provisorio por apertura de local. */
				if (((date.day === 15) && (date.month === 6)) && (date.year === 2018)) {
					result = {
								class_element: 'closed',
								status: 'Cerrado',
								message: 'Reabrimos hoy a partir de las 9:30hs. ¡Te esperamos!',
								cta: [
									{
										class_element: 'btn btn-outline-light',
										string: 'Ubicación',
										link: '#location'
									}
								]
							};
				}
			} else {
				result = {
					class_element: 'closed',
					status: 'Cerrado',
					message: 'Atendemos ' + when_opens + ' de ' + hours.from[0] + ':' + hours.from[1] + ' a ' + hours.to[0] + 'hs.',
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
				message: 'Atendemos ' + when_opens + ' de ' + hours.from[0] + ':' + hours.from[1] + ' a ' + hours.to[0] + 'hs.',
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
	return result;
}
