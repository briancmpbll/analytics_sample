(function() {
'use strict';

var app = angular.module('analyticsApp');

app.component('revenueTable', {
  templateUrl: '/templates/_revenue_table.html',
  bindings: {
    data: '<',
    product: '<',
    year: '<'
  }
});
})();
