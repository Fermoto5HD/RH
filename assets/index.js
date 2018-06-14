import 'scss/style.scss';
import brand from './img/brand.png';
import fm5hd from './img/fm5hd.svg';
import cover from './img/cover-teaser.jpg';
import './libs/bootstrap-native-v4.min.js';

function _makeYear() {
	var d = new Date();
	return d.getFullYear();
}

function _detectPosition(position) {
	var max = 150;
	if (document.documentElement.clientWidth < 992) {
		max = 50;
	}
	if (position > max) {
		document.getElementsByClassName("navbar")[0].classList.add("on-scroll");
	} else {
		document.getElementsByClassName("navbar")[0].classList.remove("on-scroll");
	}
}

var map_visible = false;

function _isVisible(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

window.document.body.onscroll = function() {
	_detectPosition(this.pageYOffset);
	if (_isVisible(document.getElementById('location'))) {
		if (google) {
			if (map_visible === false) {
				map_visible = true;
				_loadMap();
			}
		}
	}
}
_detectPosition(window.document.pageYOffset);

document.getElementById("year").innerHTML = _makeYear();

function currentYPosition() {
    /* Firefox, Chrome, Opera, Safari */
    if (self.pageYOffset) return self.pageYOffset;
    /* Internet Explorer 6 - standards mode */
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    /* Internet Explorer 6, 7 and 8 */
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop - 80;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function goTo(hash) {
	if (history.pushState) {
		history.pushState(null, null, '#' + hash);
	} else {
		location.hash = '#' + hash;
	}

	var eID = document.getElementById(hash);
    var startY = currentYPosition();
    var stopY = elmYPosition(hash);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 5);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

var gmap;
function _loadMap() {
	var map_style = new google.maps.StyledMapType([
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#bdbdbd"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#ffffff"
		      }
		    ]
		  },
		  {
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#dadada"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.line",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#c9c9c9"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  }
		]);



	/* Pin */
	var store = {
		lat: -34.6078369,
		lng: -58.4958481
	};
	gmap = new google.maps.Map(document.getElementById('🗺️'), {
		center: store,
		zoom: 16
	});

	var pin_shop_info = new google.maps.InfoWindow({
		content: '<h4>Nuestro local</h4><p style="margin-bottom: 0px;">Melincué 3593, Villa del Parque.</p>'
	});

	var pin_store = new google.maps.Marker({
		position: store,
		animation: google.maps.Animation.DROP,
		map: gmap
	});

	pin_store.addListener('click', function() {
		pin_shop_info.open(gmap, pin_store);
	});
	/* End pin */

	gmap.mapTypes.set('styled_map', map_style);
	gmap.setMapTypeId('styled_map');

	var transitLayer = new google.maps.TransitLayer();
	transitLayer.setMap(gmap);
}
window._loadMap = _loadMap;

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

var form_name = document.getElementsByName("name");
if (form_name.length > 0) {
	form_name[0].addEventListener("input", function (event) {
		if (form_name.valueMissing) {
			form_name.setCustomValidity("Por favor ingresá el nombre.");
		} else {
			form_name.setCustomValidity("");
		}
	});
}

var email = document.getElementsByName("email");
if (email.length > 0) {
	email[0].addEventListener("input", function (event) {
		if (email.validity.typeMismatch) {
			email.setCustomValidity("El e-mail que ingresaste no es válido.");
		} else {
			email.setCustomValidity("");
		}
	});
}

function shopStatus() {
	var xhttp = new XMLHttpRequest();
	xhttp.overrideMimeType("application/json");
	xhttp.open("GET", "api/now", true);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.response);
			document.getElementById("shop-status").classList.add(res.class_element);
			document.getElementById("shop-status").getElementsByTagName("strong")[0].textContent = res.status;
			document.getElementById("shop-status").getElementsByTagName("p")[0].textContent = res.message;
			if (res.cta.length > 0) {
				var btn_group = document.createElement("div");
				btn_group.classList = 'btn-group';
				var the_group = document.getElementById("shop-status").getElementsByClassName("container-fluid")[0].appendChild(btn_group);
				res.cta.forEach(function(v, i) {
					var button = document.createElement("a");
					button.classList = v.class_element;
					button.href = v.link;
					button.appendChild(document.createTextNode(v.string));
					the_group.appendChild(button);
				});
			}
		}
	};
	xhttp.send();
}

shopStatus();

// Email obfuscator script 2.1 by Tim Williams, University of Arizona
// Random encryption key feature coded by Andrew Moulden
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/
function showEmail() {
	var coded = "gu0pLccM0cwupObL@FYuOQ.0LY";
	var key = "SIqAJG5K9chv6tz4PmuWi1gDoTek7VC2EZl0MbXp83RYBrOxFyLswHadNUfnQj";
	var shift = coded.length;
	var link = "";
	for (i=0; i < coded.length; i++) {
		var ltr = null;
		if (key.indexOf(coded.charAt(i))==-1) {
			ltr = coded.charAt(i)
			link += (ltr)
		}
		else {     
			ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
			link += (key.charAt(ltr))
		}
	}
	return link;
}

document.getElementById('our-email').innerHTML = ' a <a href="mailto:' + showEmail() + '">nuestro e-mail</a>';