// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
const webpack = require('./webpack.config');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test (awesome)
      suppressErrorSummary: false, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false, // print the time elapsed for each spec
      failFast: false, // test would finish with error when a first fail occurs.
    },
    files: ['src/tests.webpack.js'],
    preprocessors: {
      'src/app/app.js': ['webpack', 'sourcemap'],
      'src/tests.webpack.js': ['webpack', 'sourcemap'],
    },
    browsers: ['PhantomJS'],
    colors: true,
    singleRun: true,
    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'text-summary' }, { type: 'html' }],
    },
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
    ],
    webpack,
    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only',
    },
  });
};
