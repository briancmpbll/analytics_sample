var app = angular.module('analyticsApp');

app.filter('millions', function() {
  return function(input) {
    return '$' + input/1000000 + 'M';
  };
});
