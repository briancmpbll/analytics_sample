(function() {
'use strict';

var app = angular.module('analyticsApp');

app.factory('Data', [
  '$resource',
  function($resource) {
    var resource = $resource('/api/data', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });

    return resource.query();
  }]);
})();
