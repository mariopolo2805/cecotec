import angular from 'angular';
import 'angular-material';
import uiRouter from '@uirouter/angularjs';

import '../style/app.scss';

import drawerTmpl from './drawer/drawer.tmpl.html';

import productList from './productList/productList.module';

const APP_NAME = 'app';

angular
  .module(APP_NAME, ['ngMaterial', uiRouter, productList])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/productList');

    $stateProvider.state('root', {
      url: '',
      abstract: true,
      views: {
        drawer: {
          template: drawerTmpl,
        },
      },
    });
  });

export default APP_NAME;
