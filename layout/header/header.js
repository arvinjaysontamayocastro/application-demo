'use strict';
angular.module('myApp').component('ngHeader', {
  templateUrl: 'layout/header/header.html',
  controller: function ($scope, $location) {
    $scope.loc = $location.path();
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  }
});