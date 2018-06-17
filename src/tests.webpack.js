// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
const context = require.context('.', true, /\.spec$/);
context.keys().forEach(context);
