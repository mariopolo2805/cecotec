import ProductListComponent from './productList.component';
import ProductListDataSrv from './productList.dataSrv';
import State from './productList.state';

const module = angular
  .module('app.productList', [])
  .component('appProductList', ProductListComponent)
  .service('productListDataSrv', ProductListDataSrv)
  .config($stateProvider => new State($stateProvider)).name;

export default module;
