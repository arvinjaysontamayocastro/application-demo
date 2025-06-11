'use strict';

angular.module('myApp').component('ngGameCard', {
  templateUrl: 'layout/game-card/game-card.html',
  styleUrls: ['layout/game-card/game-card.css'],
  controller: function ($scope, gameService, gameFactory) {
    /*
      Defaults
    */
    var col = gameFactory.getValues().col;
    var row = gameFactory.getValues().row;
    $scope.level = 1;
    $scope.maxLevel = col * row;
    $scope.selectedCount = 0;

    /*
      Initialize
    */
    $scope.init = function() {
      $scope.card = new GameCard(col, row);
      $scope.card.initializeTiles();
      $scope.card.initializeValues();
    }

    $scope.$on('setGameCardInitialize', function() {
      $scope.init();
    });
    $scope.$on('setGameCardLevel', function(event, data) {
      $scope.level = data.level;
      $scope.card.setLevel(data.level);
    });
    $scope.$on('setGameCardReadOnly', function(event) {
      $scope.card.setEditable(false);
    });
    $scope.$on('setGameCardClickable', function() {
      $scope.card.setEditable(true);
    });
    $scope.$on('setGameCardRandom', function() {  
      $scope.card.setRandom($scope.level);
      $scope.card.setConfigurationCorrect();
    });
    $scope.$on('setGameCardGame', function() {
      $scope.card.setClear();
    });
    $scope.$on('setGameCardSubmit', function() {
      $scope.card.setEditable(false);
      $scope.card.setConfigurationAnswer();
      $scope.card.setPoint();
      $scope.card.computePointPerfect();
      $scope.card.setConfigurationPoint();
      var newLevel = $scope.level;
      if($scope.card.isPointPerfect) {
        newLevel = $scope.level + 1 > $scope.maxLevel ? $scope.maxLevel : $scope.level + 1;
      }
      else {
        newLevel = $scope.level - 1 === 0 ? 1 : $scope.level - 1;
      }
      $scope.level = newLevel;
      gameService.saveValues($scope.card);
    });

    $scope.toggleTile = function (index) {
      $scope.card.toggleTile(index);
      // $scope.selectedCount = $scope.card.countActive();
    }

    $scope.init();
  }
});