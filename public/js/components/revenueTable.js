(function() {
'use strict';

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

app.component('revenueTable', {
  templateUrl: '/templates/_revenue_table.html',
  bindings: {
    data: '<',
    product: '<',
    year: '<'
  },
  controllerAs: 'ctrl',
  controller: ['$scope', function($scope) {
    var ctrl = this;

    ctrl.revenueData = [];

    var nestedData = d3.nest()
      .key(function(d) { return d.year; }).sortKeys(d3.ascending)
      .key(function(d) { return d.product; }).sortKeys(d3.ascending)
      .key(function(d) { return d.country; }).sortKeys(d3.ascending)
      .rollup(function(entries) {
        return d3.sum(entries, function(d) { return d.revenue; });
      })
      .entries(ctrl.data);

    nestedData.forEach(function(year) {
      year.values.forEach(function(product) {
        product.values.forEach(function(country) {
          ctrl.revenueData.push({
            year: year.key,
            product: product.key,
            country: country.key,
            revenue: country.value
          });
        });
      });
    });
  }]
});
})();
