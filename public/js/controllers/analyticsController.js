(function() {
'use strict';

var app = angular.module('analyticsApp');

app.controller('AnalyticsController', [
  'data',
  function(data) {
    this.test = 'Hello World!';
    this.data = data;
  }]);

})();
