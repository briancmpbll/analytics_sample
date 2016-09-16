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
      url: '',
      templateUrl: '/views/analytics.html',
      controller: 'AnalyticsController',
      controllerAs: 'ctrl',
      resolve: {
        data: function(Data) {
          return Data.$promise;
        }
      }
    })
    .state('404', {
      templateUrl: '/views/404.html'
    })
    .state('error', {
      templateUrl: '/views/error.html'
    });

    $urlRouterProvider.otherwise(function($injector, $location){
       var state = $injector.get('$state');
       state.go('404');
       return $location.path();
    });
  }]);

app.run([
  '$rootScope',
  '$state',
  function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function() {
      $state.go('error');
    });
  }]);
})();
