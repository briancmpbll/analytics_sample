(function() {
'use strict';

var app = angular.module('analyticsApp', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
      url: '/index',
      templateUrl: '/templates/_analytics.html',
      controller: 'AnalyticsController'
    });

    $urlRouterProvider.otherwise('index');
  }]);
})();
