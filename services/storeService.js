
var storeService = function() {
  this.storeName = "store.";
  this.storeService = {
    games: []
  };
  this.loadValues = function (containerName) {
    if(this.storeService[containerName] && this.storeService[containerName].length > 0) {
      return this.storeService[containerName];
    }
    var storageValues = localStorage.getItem(this.storeName+containerName);
    if(storageValues) {
        var parseValues = angular.fromJson(storageValues);
        this.storeService[containerName] = parseValues;
    }
    return this.storeService[containerName];
  }
  this.getValues = function (containerName) {
    return this.storeService[containerName];
  }
  this.saveValues = function (containerName, values) {
    this.storeService[containerName].unshift(values);
    localStorage.setItem(this.storeName+containerName, angular.toJson(this.storeService[containerName]));
  }
}