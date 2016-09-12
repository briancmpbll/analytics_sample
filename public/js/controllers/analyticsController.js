(function() {
'use strict';

var app = angular.module('analyticsApp');

app.controller('AnalyticsController', [
  'data',
  function(data) {
    var ctrl = this;

    ctrl.test = 'Hello World!';

    ctrl.currentYear = 'All';
    ctrl.years = {
      All: data
    };

    data.forEach(function(record) {
      if (!ctrl.years.hasOwnProperty(record.year)) {
        ctrl.years[record.year] = [];
      }
      ctrl.years[record.year].push(record);
    });
  }]);

})();
