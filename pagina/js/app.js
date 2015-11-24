$.ajaxSetup ({
	cache: false
});
var paginaActual = undefined; 

// Al arranque
	$(document).ready(function() {
		$('header').load('ux/header.html'); 
		$('footer.row').load('ux/footer.html'); 
		if(window.location.hash) {
				var hash = window.location.hash.substring(1); 
				var cargapagina = $.get( '../secciones/'+hash+'.html', function(laPagina) {
					$('main').html(laPagina);
				})
					.fail(function() { 
						$('main').load('../secciones/404.html'); 
					});
				paginaActual = hash; 
		} else {
				seccion('inicio');
				paginaActual = 'inicio'; 
		}
		//$("#navegacion").css("display", "none");

		//$('main').load('secciones/inicio.html'); 

		// Funciones según el tamaño del sitio (powered by Modernizr). 
		var query = Modernizr.mq('(min-width: 40.0625em)');
		if (query) {
			console.log('Acá anda.');
			$('nav.top-bar').css('height', '155px'); 
			$(window).scroll(function (event) {
				var scroll = $(document).scrollTop(); 
				if (scroll <= 400){
					console.log('Barra en 0.'); 
					$('.top-bar#barra-superior').removeClass('scroll');
					$('li.brand img').removeClass('scroll');  
					$('.top-bar ul.menu li').removeClass('scroll'); 
					$('.top-bar ul.menu li a').removeClass('scroll'); 
					$('nav.top-bar').removeClass('scroll'); 
					//$('nav.top-bar').animate({height: '155px'}, 75); 
					//$('nav.top-bar').animate({height: '155px'}, 75, 
					//	function(){
					//		$('.contain-to-grid#barra-superior').removeClass('scroll'); 
					//	}); 
					//$('li.name img').animate({height: '150px'}, 75); 
				} else {
					console.log('Barra despegada. '); 
					$('.top-bar#barra-superior').addClass('scroll'); 
					$('li.brand img').addClass('scroll'); 
					$('.top-bar ul.menu li').addClass('scroll'); 
					$('.top-bar ul.menu li a').addClass('scroll'); 
					$('nav.top-bar').addClass('scroll'); 
					//$('nav.top-bar').animate({height: '2.8125rem'}, 75); 
					//$('li.name img').animate({height: '40px'}, 75); 
				}
			});
		} else {
			console.log('Otra vista.'); 
		}
	});

//
var seccion = function(pagina){
	console.log(pagina); 
	$('ul#menu li#'+paginaActual).removeClass('active'); 
	if (paginaActual !== pagina) {
		var cargapagina = $.get( '../secciones/'+pagina+'.html', function(laPagina) {
			$('ul#menu li#'+pagina).addClass('active'); 
			$('main').html(laPagina);
		})
			.fail(function() { 
				$('main').load('../secciones/404.html'); 
		});
		//$('main#cuerpo').load('../secciones/'+pagina+'.html'); 
		window.location.hash = pagina; 
		paginaActual = pagina; 
		haciaArriba(); 
		console.info('Estás en la sección '+pagina+'. '); 
	};
}

var haciaArriba = function(){
	console.log("Desplazando el sitio hacia arriba.");
	$('body').animate({scrollTop:0}, 500);
}

// Inicia funciones de Foundation 
$(document).foundation();