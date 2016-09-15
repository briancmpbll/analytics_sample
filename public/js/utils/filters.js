var app = angular.module('analyticsApp');

app.filter('revenueTableFilter', function() {
  return function(input, year, product) {
    return input.filter(function(elem) {
      return (year === 'All' || elem.year === year) &&
        elem.product === product;
    });
  };
});

app.filter('millions', function() {
  return function(input) {
    return '$' + input/1000000 + 'M';
  };
});
