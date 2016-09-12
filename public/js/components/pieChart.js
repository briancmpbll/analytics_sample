(function() {
'use strict';

var app = angular.module('analyticsApp');

app.component('pieChart', {
  templateUrl: '/templates/_pie-chart.html',
  bindings: {
    year: '<'
  }
});
})();
