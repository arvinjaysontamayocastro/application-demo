'use strict';
angular.module('myApp').component('ngSidebar', {
  templateUrl: 'layout/sidebar/sidebar.html',
  controller: function ($scope, $location) {
    $scope.loc = $location.path();
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  }
});