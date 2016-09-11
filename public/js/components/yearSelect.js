(function() {
'use strict';

var app = angular.module('analyticsApp');

app.component('yearSelect', {
  templateUrl: '/templates/_year-select.html',
  bindings: {
    data: '<'
  }
});
})();
