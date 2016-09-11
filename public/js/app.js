(function() {
'use strict';

var app = angular.module('analyticsApp', [
  'ui.router',
  'ngResource'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
      url: '/index',
      templateUrl: '/templates/_analytics.html',
      controller: 'AnalyticsController',
      controllerAs: 'ctrl',
      resolve: {
        data: function(Data) {
          return Data.$promise;
        }
      }
    });

    $urlRouterProvider.otherwise('index');
  }]);
})();
