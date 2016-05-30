module.exports = function(grunt) {
    'use strict';

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            dist: 'dist',
            src: 'src',
            js: '<%= dirs.src %>/js',
            vendor: 'vendor'
        },

        bower: {
            install: {
                options: {
                    targetDir: '<%= dirs.vendor %>/bower_components',
                    layout: 'byComponent',
                    verbose: true,
                    cleanup: true
                }
            }
        },

        // Clean the temporary folders each time to start fresh
        clean: ['<%= dirs.dist %>'],

        browserify: {
            dist: {
                files: {
                    '<%= dirs.dist %>/app.js': ['<%= dirs.js %>/app.js']
                },
                options: {
                    plugin: ['bundle-collapser/plugin'], //a tool from substack himself
                    browserifyOptions: {
                        fullPaths: false,
                        insertGlobals: false,
                        detectGlobals: true,
                        standalone: '<%= pkg.name %>' //works now
                    }
                }
            }
        },
        
        // Always check if javascript code is clean and well written. Unforgiving configuration.
        jshint: {
            files: [
                '**/*.js',
                '!node_modules/**/*',
                '!<%= dirs.vendor %>/**/*',
                '!<%= dirs.dist %>/**/*'
            ],
            options: {
                curly: true,
                eqeqeq: true,
                unused: true,
                globals: {
                    flickrTool: true
                }
            }
        },

        uglify: {
            options: {
                report: 'gzip', //only shows with --verbose in current version
                banner: '// <%= pkg.name %> v<%= pkg.version %> \n' +
                    '// license:<%= pkg.license %> \n' +
                    '// <%= pkg.author %> \n' +
                    '// built <%= grunt.template.today(\'yyyy-mm-dd\') %> \n' //remember the newline! :)
            },
            dist: {
                files: [{
                    src: '<%= dirs.dist %>/*.js', // source files mask
                    dest: '<%= dirs.dist %>/', // destination folder
                    expand: true, // allow globbing src
                    flatten: true, // remove all unnecessary nesting
                    ext: '.min.js' // replace .js to .min.js
                }]
            }
        },

        copy: {
            main: {
                expand: true, 
                flatten: true,
                src: '<%= dirs.src %>/*.html', 
                dest: '<%= dirs.dist %>/',
                filter: 'isFile'
            },
            css: {
                expand: true,
                flatten: true,
                src: '<%= dirs.src %>/css/*.css',
                dest: '<%= dirs.dist %>/css'
            },
            // Vendors who need to be called within the index. TODO: Improve
            vendor_bootstrap: {
                expand: true,
                flatten: true,
                src: '<%= dirs.vendor %>/bower_components/bootstrap-css-only/*',
                dest: '<%= dirs.dist %>/vendor/bootstrap-css-only/'
            },
            vendor_html5shiv: {
                expand: true,
                flatten: true,
                src: '<%= dirs.vendor %>/html5shiv/*',
                dest: '<%= dirs.dist %>/vendor/html5shiv/'
            }
        },

        // Auto reload Grunt tasks on JS and CSS changes
        watch: {
            js: {
                files: [ '<%= dirs.js %>/**/*.js'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['<%=dirs.src %>/*.html'],
                tasks: ['build']
            },
            css: {
                files: ['<%=dirs.src %>/**/*.css'],
                tasks: ['build']
            }
        }

    });
    
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'uglify', 'copy']);

    grunt.registerTask('default', ['build', 'watch']);
};