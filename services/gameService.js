
var gameService = function(storeService) {
  this.containerName = "games";
  this.loadValues = function () {
    return storeService.loadValues(this.containerName);
  }
  this.getValues = function () {
    return storeService.getValues(this.containerName);
  }
  this.saveValues = function (values) {
    /*
        Presave sanitation
    */
    var sanitizeValues = JSON.parse(JSON.stringify(values));
    delete sanitizeValues.tiles;
    storeService.saveValues(this.containerName, sanitizeValues);
  }
}