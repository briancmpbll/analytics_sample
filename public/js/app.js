(function() {
'use strict';

var app = angular.module('analyticsApp', []);

app.controller('AnalyticsController', [
  '$scope',
  function($scope) {
    $scope.test = 'Hello World';
  }]);

})();
