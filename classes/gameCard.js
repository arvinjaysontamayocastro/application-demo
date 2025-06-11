class GameCard {
  /*
    Configuration
  */
  col = 4;
  row = 4;
  maxTiles = 16; // derived configuration
  level = 1; // set configuration
  score = 0; // computed

  /*
    States
  */
  isEditable = false;
  isPointPerfect = false;
  isPointComputed = false;

  /*
    Collections
  */
  tiles = [];

  /*
    Configuration stores
  */
  configurationCorrect = "";
  configurationAnswer = "";
  configurationPoint = "";

  /*
    Constructor
  */
  constructor(col, row) {
    this.tiles = [];
    this.maxTiles = col * row;
    this.initializeValues();
    this.initializeTiles();
  }

  /*
    Initializers
  */
  initializeTiles = function() {
    var tileList = [];
    for(var c = 0; c < this.maxTiles; c++) 
    {
      tileList.push(new GameCardTile(0));
    }
    this.tiles = tileList;
  }

  initializeValues = function() {
    this.isEditable = false;
    this.isPointPerfect = false;
    this.isPointComputed = false;
    this.score = 0;
    this.configurationCorrect = "";
    this.configurationAnswer = "";
    this.configurationPoint = "";
  }

  /*
    Setters
  */
  setEditable = function(isEditable) {
    this.isEditable = isEditable;
  }

  setClear = function() {
    for(var c = 0; c < this.maxTiles; c++) 
    {
      this.tiles[c].value = 0;
    }
    this.isPointComputed = false;
  }
  
  setLevel = function(level) {
    this.level = level
  }

  setRandom = function(level) {
    this.level = level;
    var levelMaxCounter = level;

    var randomNumbers = [];
    do {
      var randomNumber = Math.floor(Math.random() * this.maxTiles);
      if(randomNumbers.indexOf(randomNumber) === -1) {
        randomNumbers.push(randomNumber);
      }
    } while(randomNumbers.length < levelMaxCounter);

    for(var c = 0; c < this.maxTiles; c++) 
    {
      this.tiles[c].value = randomNumbers.indexOf(c) != -1 ? 1 : 0;
    }
    this.isPointComputed = false;
  }

  setPoint = function() {
    var pointTiles = [];
    for(var c = 0; c < this.maxTiles; c++) 
    {
      this.tiles[c].point = Number(this.configurationCorrect[c]) === Number(this.configurationAnswer[c]) ? 1 : 0;
    }
    this.isPointComputed = true;
  }

  setConfigurationCorrect = function(configuration) {
    this.configurationCorrect = this.computeConfiguration("value", configuration);
  }

  setConfigurationAnswer = function(configuration) {
    this.configurationAnswer = this.computeConfiguration("value", configuration);
  }

  setConfigurationPoint = function(configuration) {
    this.configurationPoint = this.computeConfiguration("point", configuration);
  }

  /*
    Toggles
  */
  toggleTile = function(index) {
    var newValue = (this.tiles[index].value + 1) % 2;
    if(this.isEditable && (this.countActive() < this.level || newValue === 0)) {
      this.tiles[index].value = newValue;
    }
  }

  /*
    Computers
  */

  countActive = function() {
    var str = this.tiles.map(tile => `${tile.value}`);
    str = `${str.join('')}`;
    return (str.match(/1/g) || []).length;
  }
  
  computePointPerfect = function() {
      var str = this.tiles.map(tile => `${tile.point}`);
      str = `${str.join('')}`;
      this.isPointPerfect = (str.match(/1/g) || []).length === this.maxTiles;
      this.score = this.level - (this.maxTiles - (str.match(/1/g) || []).length);
  }

  computeConfiguration = function(tilePropertyName, configuration) {
    if(configuration && configuration.length > maxTiles) {
      return configuration;
    }
    else
    {
      // generate
      var str = this.tiles.map(tile => `${tile[tilePropertyName]}`);
      str = `${str.join('')}`;
      return str;
    }
  }
}