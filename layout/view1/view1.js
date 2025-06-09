'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'layout/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'simpleFactory', function($scope, simpleFactory) {
  $scope.customers = [];
  
  init();
  
  function init() {
    $scope.customers = simpleFactory.getCustomers();
  }

  $scope.addCustomer = function() {
    $scope.customers.push(
      { name: $scope.newCustomer.name,
        city: $scope.newCustomer.city
      });
  }
}]);