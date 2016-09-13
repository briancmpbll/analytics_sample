(function() {
'use strict';

var app = angular.module('analyticsApp');

app.directive('pieChart', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/_pie-chart.html',
    scope: {
      year: '<',
      data: '<'
    }
  };
});
})();
