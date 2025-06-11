'use strict';

angular.module('myApp.readView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/read-view', {
    templateUrl: 'layout/read-view/read-view.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);