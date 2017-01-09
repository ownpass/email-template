module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                'build/'
            ]
        },
        copy: {
            'dist': {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'src/images/**/*.png'
                        ],
                        dest: 'build/images/'
                    }
                ]
            }
        },
        inlinecss: {
            dist: {
                options: {},
                files: {
                    'build/html/template.html': 'src/html/template.html'
                }
            }
        },
        sass: {
            src: {
                options: {
                    loadPath: [],
                    style: 'expanded',
                    sourcemap: 'none',
                    trace: true,
                    unixNewlines: true
                },
                files: {
                    'build/css/ownpass.css': 'src/scss/ownpass.scss'
                }
            },
            dist: {
                options: {
                    loadPath: [],
                    style: 'compressed',
                    sourcemap: 'inline',
                    trace: true,
                    unixNewlines: true
                },
                files: {
                    'build/css/ownpass.min.css': 'src/scss/ownpass.scss'
                }
            }
        },
        watch: {
            html: {
                files: [
                    'src/html/**/*.html'
                ],
                tasks: ['inlinecss'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: [
                    'src/scss/**/*.scss'
                ],
                tasks: ['sass', 'inlinecss'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-inline-css');

    grunt.registerTask('default', [
        'clean',
        'copy',
        'sass',
        'inlinecss'
    ]);
};
