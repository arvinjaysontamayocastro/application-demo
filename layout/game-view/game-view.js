'use strict';

angular.module('myApp.gameView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game-view', {
    templateUrl: 'layout/game-view/game-view.html',
    controller: 'GameViewCtrl'
  });
}])

.controller('GameViewCtrl', ['$scope', 'gameFactory', 'gameService', '$timeout', function($scope, gameFactory, gameService, $timeout) {
  const gameModes = Object.freeze({
    NEW: 0,
    SET: 1,
    GAME: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
  });

  // $scope.customers = [];
  $scope.tiles = [];
  $scope.gameModes = gameModes;
  $scope.gameMode = gameModes.NEW;
  $scope.level = 1;

  $scope.reveal = function() {
    $scope.setLevelBasedOnHistory();
    $scope.$broadcast('setGameCardReadOnly');
    $scope.$broadcast('setGameCardRandom');
    $scope.gameMode = gameModes.SET;
    $timeout(function(){
      $scope.$broadcast('setGameCardGame');
      $scope.$broadcast('setGameCardClickable');
      $scope.gameMode = gameModes.GAME;
    }, 3000);
  }

  $scope.submit = function() {
    $scope.$broadcast('setGameCardSubmit');
    $scope.gameMode = gameModes.NEXT;
  }

  $scope.next = function() {
    // gameService.saveValues();
    $scope.gameMode = gameModes.NEW;
    $scope.$broadcast('setGameCardInitialize');
  }
  
  function init() {
    $scope.gameMode = gameModes.NEW;
    $scope.$broadcast('setGameCardInitialize');
    // $scope.customers = gameFactory.getValues();
  }

  $scope.setLevelBasedOnHistory = function() {
    $scope.history = gameService.loadValues();
    var recentPlay = $scope.history[0];
    if($scope.history && $scope.history.length > 0) {
      $scope.level = recentPlay.level;
      $scope.level = recentPlay.score === recentPlay.level ? $scope.level + 1 : $scope.level - 1 === 0 ? 1 : $scope.level - 1;
    }
    $scope.$broadcast('setGameCardLevel', {level: $scope.level});
  }
  
  init();

  // $scope.addCustomer = function() {
  //   $scope.customers.push(
  //     { name: $scope.newCustomer.name,
  //       city: $scope.newCustomer.city
  //     });
  // }
}]);