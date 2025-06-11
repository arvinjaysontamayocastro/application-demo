'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.gameView',
  'myApp.readView',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  // $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/game-view'});
}]);