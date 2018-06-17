import template from './productList.tmpl.html';

import newTmpl from '../product/new.tmpl.html';
import editTmpl from '../product/edit.tmpl.html';

const component = {
  template,
  controller: class ProductListCtrl {
    constructor(productListDataSrv, $mdToast, $mdDialog) {
      'ngInject';

      // Bindings
      this.productListDataSrv = productListDataSrv;
      this.$mdToast = $mdToast;
      this.$mdDialog = $mdDialog;

      // Initializations
      this.isLoading = true;
      this.productList = [];
    }

    $onInit() {
      this.getProductList();
    }

    getProductList() {
      this.isLoading = true;
      return this.productListDataSrv
        .getProductList()
        .then(result => {
          this.productList = [...this.productList, ...result.data];
          this.isLoading = false;
        })
        .catch((error = {}) => {
          this.isLoading = false;
          this.manageError(error);
        });
    }

    newProduct(product) {
      this.isLoading = true;
      return this.productListDataSrv
        .newProduct(product)
        .then(() => {
          this.productList.push(product);
          this.isLoading = false;
        })
        .catch((error = {}) => {
          this.isLoading = false;
          this.manageError(error);
        });
    }

    editProduct(product) {
      this.isLoading = true;
      return this.productListDataSrv
        .editProduct(product)
        .then(() => {
          Object.assign(
            this.productList.find(item => item.id === product.id),
            product
          );
          this.isLoading = false;
        })
        .catch((error = {}) => {
          this.isLoading = false;
          this.manageError(error);
        });
    }

    deleteProduct(product) {
      this.isLoading = true;
      return this.productListDataSrv
        .deleteProduct(product.id)
        .then(() => {
          this.productList.splice(this.productList.indexOf(product), 1);
          this.isLoading = false;
        })
        .catch((error = {}) => {
          this.isLoading = false;
          this.manageError(error);
        });
    }

    openNewDialog() {
      this.$mdDialog
        .show({
          template: newTmpl,
          controller: () => {},
          controllerAs: '$ctrl',
          clickOutsideToClose: true,
          bindToController: true,
          locals: {
            product: {
              id: Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5),
            },
            new: newProduct => this.$mdDialog.hide(newProduct),
          },
        })
        .then(newProduct => this.newProduct(newProduct), () => {});
    }

    openEditDialog(product) {
      this.$mdDialog
        .show({
          template: editTmpl,
          controller: () => {},
          controllerAs: '$ctrl',
          clickOutsideToClose: true,
          bindToController: true,
          locals: {
            product: Object.assign({}, product),
            edit: editedProduct => this.$mdDialog.hide(editedProduct),
          },
        })
        .then(editedProduct => this.editProduct(editedProduct), () => {});
    }

    openDeleteDialog(product) {
      const confirm = this.$mdDialog
        .confirm()
        .title('Are you sure?')
        .textContent('This action will delete the product')
        .ariaLabel('Delete product')
        .ok('Delete')
        .cancel('Cancel');

      this.$mdDialog
        .show(confirm)
        .then(() => this.deleteProduct(product), () => {});
    }

    manageError({ status, statusText }) {
      if (status === 401) {
        window.location.href = 'login.html';
      }
      this.$mdToast.show(
        this.$mdToast
          .simple()
          .textContent(`Ops! Something went wrong: ${statusText}`)
          .position('bottom')
          .hideDelay(3000)
      );
    }
  },
};

export default component;
