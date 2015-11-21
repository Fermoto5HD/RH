module.exports = function(grunt) {
	grunt.initConfig({
		// Levanta el server configurado en app.js 
		express: {
			dev: {
			  options: {
			    script: 'sitio.js'
			  }
			}
		}, 
		// Tarea de compilacion de los scss a css 
		sass: {
			dist: {
				// Cualquier archivo scss que encuentre se va a compilar automaticamente. 
				files: [{
					expand: true,
					cwd: 'pagina/sass',						// Entran por aca como scss 
					src: ['*.scss'],
					dest: 'pagina/css',						// Salen aca como css comun y corriente
					ext: '.css'
				}]
			}
		}, 
		// Vigila cambios en archivos sass, css y html y los recarga bajo el puerto 35729 
		watch: {
			options: { livereload: 35729 }, 	//Esto permite que haga magia en el browser. 
			sass: {
				files: "pagina/sass/*.scss",		//Cualquier cambio en los scss hara que ejecute la tarea 'sass'. 
				tasks: ['sass'] 								//Se va a compilar los scss y luego recarga. 
			}, 
			css: {
				files: ['pagina/css/*.css']			//Cualquier cambio en los css deberia recargar... cosa que no me anda aun. 
			},  
			html: {
				files: ['pagina/*.html']				//Cualquier cambio en los html recarga automaticamente en el browser. 
			},
		}
	});

	//Carga las tareas para nuestras necesidades 											//Si colocas en la consola: 	Lo que va a hacer es: 
	grunt.loadNpmTasks('grunt-contrib-sass');													//grunt sass 									Compilar los scss 
	grunt.loadNpmTasks('grunt-contrib-watch');												//grunt watch 								Vigilar los cambios de archivos 
	grunt.loadNpmTasks('grunt-express-server');												//grunt express								Levantar el server 
	grunt.registerTask('default', ['express', 'watch']);							 	//grunt 											Idem grunt watch 
};