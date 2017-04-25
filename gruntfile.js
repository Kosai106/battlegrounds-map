module.exports = function(grunt) {
  grunt.initConfig({
    haml: {
			dist: {
        options: {
          bundleExec: true,
					format: 'html5',
					encoding: 'utf-8',
					style: 'compressed',
        },
        files: {
					'index.html': 'haml/index.haml',
        }
      }
    },
		sass: {
			options: {
				sourcemap: false, 					// No sourcemap as postcss will generate one instead
			},
			dev: {
				options: {
					outputStyle: 'expanded',
				},
				files: {
					'css/application.css': 'css/application.scss',
				}
			},
	    dist: {
	      options: {
	        outputStyle: 'compressed',
	      },
	      files: {
	        'css/application.css': 'css/application.scss',
	      }
	    }
	  },
		postcss: {
	    dist: {
				options: {
		      map: true, 																								// Inline sourcemaps
		      processors: [
		        require('pixrem')(), 																		// Add fallbacks for rem units
						require('cssnext')(),																		// Enables future syntax
		        require('autoprefixer')(																// Adds vendor prefixes
							{browsers: 'last 5 versions'}
						),
						require("postcss-color-rgba-fallback")(),								// Adds a hexcode fallback
		        require('cssnano')( 																		// Minify the result
							{calc: {precision: 2}},
							{discardComments: {removeAll: true}}
						),
		      ]
		    },
				files: [
					{src: 'css/application.css', dest: 'css/application.min.css'},
				]
	    }
	  },
		babel: {
	    options: {
        sourceMap: 'inline',
				compact: 'auto',
        presets: ['es2015'],
				minified: true,
	    },
	    dist: {
        files: {
					'js/application.min.js': 'js/application.js',
        }
	    }
    },
		clean: {
			dist: [
				'css/application.css',
			]
		},
		imagemin: {                          									// Task
			options: {                       										// Target options
        optimizationLevel: 3,															// 0-7
        svgoPlugins: [{ removeViewBox: false }],
      },
			dist: {
				files: [{
					expand: true,													// Enable dynamic expansion
					cwd: 'img/',													// Src matches are relative to this path
	        src: ['**.{jpg,gif,png}'],						// Actual patterns to match
	        dest: 'img/',													// Destination path prefix
	        ext: '.min.jpg',											// Output suffix
				}]
			}
	  },
		connect: {
			server: {
				options: {
					base: '',
					// This will inject live reload script into the html
					livereload: 35729,
					port: 8080
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['scss/*.scss'],
				tasks: ['sass:dist', 'postcss:dist', 'clean:dist'],
			},
			js: {
				files: ['js/*.js', '!js/*.min.js'],
				tasks: ['babel:dist'],
			},
			haml: {
				files: ['haml/*.haml'],
				tasks: ['haml:dist'],
			},
		},
		notify: {
			dev: {
				options: {
					title: 'Task Complete',
					message: 'Development taks successfully compiled!',
				}
			},
			dist: {
				options: {
					title: 'Task Complete',
					message: 'Successfully compiled HAML, JS, SCSS and PostCSS!',
				}
			},
			img: {
				options: {
					title: 'Task Complete',
					message: 'Successfully minified all images!',
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-haml2html');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-sass');

	// Livereload for development
	grunt.registerTask('server', [
		'connect',
		'watch'
	]);

	// build for development
  grunt.registerTask('dev', [
		'haml:dist',
		'sass:dev',
		'notify:dev'
	]);

	// Build for production
  grunt.registerTask('default', [
		'haml:dist',
		'sass:dist',
		'postcss:dist',
		'clean:dist',
		'babel:dist',
		'notify:dist',
	]);

	// Image optimization
	grunt.registerTask('img', [
		'imagemin:dist',
		'notify:img'
	]);
};
