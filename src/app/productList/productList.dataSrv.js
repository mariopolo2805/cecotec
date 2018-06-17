class ProductListDataSrv {
  constructor($http) {
    'ngInject';

    // Bound injections
    this.$http = $http;
  }

  getProductList() {
    const options = {
      method: 'GET',
      url: '/products',
    };
    return this.$http(options);
  }
}

export default ProductListDataSrv;
