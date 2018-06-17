class States {
  constructor($stateProvider) {
    'ngInject';

    $stateProvider.state('root.productList', {
      url: '/productList',
      views: {
        'layout@': {
          template:
            '<app-product-list layout="column" flex="auto"></app-product-list>',
        },
      },
    });
  }
}

export default States;
