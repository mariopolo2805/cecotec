describe('Test suite for ProductList component', () => {
  let $componentController;
  let component;
  let productListDataSrv;

  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('ngMaterial'));
  beforeEach(angular.mock.module('app.productList'));

  beforeEach(() => {
    angular.mock.inject((_$componentController_, _productListDataSrv_) => {
      $componentController = _$componentController_;
      productListDataSrv = _productListDataSrv_;
    });
    spyOn(productListDataSrv, 'getProductList').and.callThrough();
    spyOn(productListDataSrv, 'newProduct').and.callThrough();
    spyOn(productListDataSrv, 'editProduct').and.callThrough();
    spyOn(productListDataSrv, 'deleteProduct').and.callThrough();
    component = $componentController(
      'appProductList',
      {
        productListDataSrv,
      },
      {}
    );
  });

  describe('constructor()', () => {
    it('should initialize values', () => {
      expect(component.isLoading).toBe(true);
      expect(component.productList).toEqual([]);
    });
  });

  describe('getProductList()', () => {
    it('should call productListDataSrv and retrieve data', () => {
      component.getProductList();
      expect(productListDataSrv.getProductList).toHaveBeenCalled();
    });
  });

  describe('newProduct()', () => {
    it('should call productListDataSrv and retrieve data', () => {
      const product = { id: 'mockId' };
      component.newProduct(product);
      expect(productListDataSrv.newProduct).toHaveBeenCalledWith(product);
    });
  });

  describe('editProduct()', () => {
    it('should call productListDataSrv and retrieve data', () => {
      const product = { id: 'mockId' };
      component.editProduct(product);
      expect(productListDataSrv.editProduct).toHaveBeenCalledWith(product);
    });
  });

  describe('deleteProduct()', () => {
    it('should call productListDataSrv and retrieve data', () => {
      const product = { id: 'mockId' };
      component.deleteProduct(product);
      expect(productListDataSrv.deleteProduct).toHaveBeenCalledWith(product.id);
    });
  });
});
