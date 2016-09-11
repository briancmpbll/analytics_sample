(function() {
'use strict';

var app = angular.module('analyticsApp');

app.controller('AnalyticsController', [
  '$scope',
  'data',
  function($scope, data) {
    $scope.test = 'Hello World!';
    $scope.data = data;
  }]);

})();
