function _makeYear() {
	var d = new Date();
	return d.getFullYear();
}

function _detectPosition(position) {
	if (position > 150) {
		document.getElementsByClassName("navbar")[0].classList.add("on-scroll");
	} else {
		document.getElementsByClassName("navbar")[0].classList.remove("on-scroll");
	}
}

window.document.body.onscroll = function() {
	_detectPosition(this.pageYOffset);
}
_detectPosition(window.document.pageYOffset);

document.getElementById("year").innerHTML = _makeYear();

/*function goTo(hash) {
	var fullhash = '#' + hash;
	if (history.pushState) {
		history.pushState(null, null, fullhash);
	} else {
		location.hash = fullhash;
	}
	var offsetTop = document.getElementById(hash).offsetTop;
	if (offsetTop !== 0) {
		offsetTop = offsetTop - 80;
	}

	$('html, body').animate({ 
		scrollTop: offsetTop
	}, 1000);
}

function _loadMap() {
	//console.log("Mapa");
}

var menu_items = document.getElementsByClassName('menu-item');
for (var i = 0; i < menu_items.length; i++) {
	menu_items[i].addEventListener('click', function (e) {
		goTo(this.hash.substr(1));
	});
}

function _hashChange(e) {
	e.preventDefault();
	goTo(location.hash.slice(1));
}

window.addEventListener("hashchange", _hashChange, false);


/*var form_name = document.getElementsByName("name")[0];
form_name.addEventListener("input", function (event) {
	if (form_name.valueMissing) {
		form_name.setCustomValidity("Por favor ingresá el nombre.");
	} else {
		form_name.setCustomValidity("");
	}
});

var email = document.getElementsByName("email")[0];
email.addEventListener("input", function (event) {
	if (email.validity.typeMismatch) {
		email.setCustomValidity("El e-mail que ingresaste no es válido.");
	} else {
		email.setCustomValidity("");
	}
});*/