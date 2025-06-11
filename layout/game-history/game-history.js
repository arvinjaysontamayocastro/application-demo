'use strict';
angular.module('myApp').component('ngGameHistory', {
  templateUrl: 'layout/game-history/game-history.html',
  styleUrls: ['layout/game-history/game-history.css'],
  controller: function ($scope, gameService) {
    $scope.init = function() {
      $scope.history = [];
      $scope.loadFromService();
    }

    $scope.loadFromService = function() {
      $scope.history = gameService.loadValues();
    }
    
    $scope.init();
  }
});