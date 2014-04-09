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
        tasks: ['browserify:dev', 'jscs:client', 'jshint:client']
      },
      templates: {
        files: ['client/templates/**/*.hbs'],
        tasks: ['emberTemplates:app', 'browserify:dev']
      },
      styles: {
        files: ['client/styles/*.less'],
        tasks: ['less']
      }
    },

    browserify: {
      libs: {
        src: [],
        dest: 'public/scripts/libs.js',
        options: {
          debug: true,
          shim: {
            'handlebars': {
              path: './bower_components/handlebars/handlebars.runtime.js',
              exports: 'Handlebars'
            },
            'ember': {
              path: './bower_components/ember/ember.js',
              exports: 'Ember',
              depends: {
                'jquery': 'jQuery',
                'handlebars': 'Handlebars'
              }
            },
            'ember-data': {
              path: './bower_components/ember-data/ember-data.js',
              exports: 'DS',
              depends: {
                'ember': 'Ember'
              }
            },
            'collapse': {
              path: './bower_components/bootstra/js/collapse.js',
              depends: {
                'jquery': 'jQuery'
              }
            }
          }
        }
      },

      dev: {
        options: {
          debug: true,
          external: [
            'jquery', 'handlebars', 'ember', 'ember-data',
            'collapse'
          ]
        },
        files: {
          './public/scripts/application.js': ['./client/.index.js']
        }
      }
    },

    emberTemplates: {
      options: {
        templateCompilerPath: './bower_components/ember/ember-template-compiler.js',
        handlebarsPath: './bower_components/handlebars/handlebars.js'
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
          dest: 'assets/styles',
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
          '*.js'
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
