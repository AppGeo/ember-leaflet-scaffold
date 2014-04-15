module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', function (target) {
    var tasks = ['clean:build'];

    if (target !== 'dist') {
      tasks = tasks.concat([
        'jshint:client',
        'jscs:client'
      ]);
    }

    tasks = tasks.concat([
      'clean:build',
      'emberTemplates',
      'less',
      'build-index',
      'browserify'
    ]);

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', [
    'build',
    'watch'
  ]);

  grunt.registerTask('lint', [
    'jshint',
    'jscs'
  ]);

  // creates a file with requires for App.* for ember
  grunt.registerTask('build-index', function () {
    var done = this.async();
    var emberStream = require('ember-stream-generator');
    var fs = require('fs');
    var inStream = emberStream('./client');
    var outStream = fs.createWriteStream('./client/.index.js');

    outStream.on('finish', done);
    inStream.pipe(outStream);
  });

  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['client/**/*.js'],
        tasks: ['browserify:app', 'jscs:client', 'jshint:client']
      },
      templates: {
        files: ['client/templates/**/*.hbs'],
        tasks: ['emberTemplates:app', 'browserify:app']
      },
      styles: {
        files: ['client/styles/*.less'],
        tasks: ['less']
      },
      browserifyOther: {
        files: ['public/libs/script-loading.js'],
        tasks: ['browserify:scriptLoading']
      }
    },

    browserify: {
      libs: {
        src: [],
        dest: 'public/scripts/libs.js',
        options: {
          debug: true,
          transforms: ['browserify-shim']
        }
      },

      app: {
        options: {
          debug: true,
          external: [
            'jquery', 'handlebars', 'ember', 'ember-data', 'collapse', 'leaflet'
          ]
        },
        files: {
          'public/scripts/application.js': ['client/.index.js']
        }
      }
    },

    emberTemplates: {
      options: {
        templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
        handlebarsPath: 'bower_components/handlebars/handlebars.js'
      },
      app: {
        options: {
          templateBasePath: 'client/templates/'
        },
        files: {
          'client/.templates.js': 'client/templates/{,*/}*.hbs'
        }
      }
    },


    less: {
      compile: {
        files: [{
          expand: true,
          cwd: 'client/styles',
          src: ['styles.less', 'libs.less', '!_*.less'],
          dest: 'public/styles',
          ext: '.css'
        }]
      }
    },

    clean: {
      build: ['build']
    },

    jscs: {
      client: {
        src: [
          'client/**/*.js'
        ]
      },
      server: {
        src: [
          'lib/**/*.js',
          '*.js'
        ]
      }
    },

    jshint: {
      client: {
        options: {
          jshintrc: true
        },
        src: [
          'client/**/*.js'
        ]
      },
      server: {
        options: {
          jshintrc: '.jshintrc_node'
        },
        src: [
          'lib/**/*.js',
          'server.js'
        ]
      }
    },

    githooks: {
      dev: {
        'pre-commit': 'lint'
      }
    }
  });
};
