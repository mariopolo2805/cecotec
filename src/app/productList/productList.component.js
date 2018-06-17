import template from './productList.tmpl.html';

const component = {
  template,
  controller: class ContractSearchCtrl {
    constructor(productListDataSrv) {
      'ngInject';

      // Bindings
      this.productListDataSrv = productListDataSrv;

      // Initializations
      this.isLoading = true;
      this.productList = [];
    }

    $onInit() {
      this.getContractList();
    }

    getContractList() {
      this.isLoading = true;
      return this.productListDataSrv
        .getProductList()
        .then(result => {
          this.productList = [...this.productList, ...result.data.items];
          this.isLoading = false;
        })
        .catch((error = {}) => {
          this.isLoading = false;
          // toast
          console.log(error);
        });
    }
  },
};

export default component;
