import 'angular';
import 'angular-mocks';
import './app/app.js';

const context = require.context('.', true, /.+\.spec\.js$/);
context.keys().forEach(context);
