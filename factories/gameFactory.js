var gameFactory = function() {
  var defaultValues = {
    col: 4,
    row: 4
  };

  var factory = {};

  factory.getValues = function() {
    return defaultValues;
  };

  return factory;
}