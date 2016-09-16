(function() {
'use strict';

var app = angular.module('analyticsApp');

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

    var revenueData = [];

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
          revenueData.push({
            year: year.key,
            product: product.key,
            country: country.key,
            revenue: country.value
          });
        });
      });
    });

    ctrl.average = 0;
    ctrl.filteredData = [];

    $scope.$watchGroup(['ctrl.product', 'ctrl.year'], function() {
      var count = 0;
      var sum = 0;
      ctrl.filteredData = [];

      revenueData.forEach(function(elem) {
        if ((ctrl.year === 'All' || elem.year === ctrl.year) &&
          elem.product === ctrl.product) {

          ++count;
          sum += elem.revenue;
          ctrl.filteredData.push(elem);
        }
      });

      ctrl.average = sum / count;
    });
  }]
});
})();
