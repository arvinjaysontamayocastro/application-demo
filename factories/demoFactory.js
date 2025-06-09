var simpleFactory = function() {
  var customers = [
    {name: 'Dave', city: 'Los Angeles'},
    {name: 'Napur', city: 'Jakarta'},
    {name: 'Heedy', city: 'Oregon'},
    {name: 'Shriva', city: 'Mumbai'}];

  var factory = {};

  factory.getCustomers = function() {
    return customers;
  };

  factory.postCustomer = function(customer) {
    //...
  };

  return factory;
}