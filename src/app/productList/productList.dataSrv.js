class ProductListDataSrv {
  constructor($http) {
    'ngInject';

    // Bound injections
    this.$http = $http;
  }

  getProductList() {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/products',
    };
    return this.$http(options);
  }

  newProduct(model) {
    const options = {
      method: 'POST',
      url: `http://localhost:3000/products`,
      data: model,
    };
    return this.$http(options);
  }

  editProduct(model) {
    const options = {
      method: 'PUT',
      url: `http://localhost:3000/products/${model.id}`,
      data: model,
    };
    return this.$http(options);
  }

  deleteProduct(id) {
    const options = {
      method: 'DELETE',
      url: `http://localhost:3000/products/${id}`,
    };
    return this.$http(options);
  }
}

export default ProductListDataSrv;
