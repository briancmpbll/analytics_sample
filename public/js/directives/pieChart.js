(function() {
'use strict';

var app = angular.module('analyticsApp');

app.directive('pieChart', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/_pie-chart.html',
    scope: {
      year: '<',
      data: '<'
    },
    controller: angular.noop,
    controllerAs: 'ctrl',
    bindToController: true,

    link: function(scope, element, attrs, ctrl) {
      // Setup static elements.
      var width = 200;
      var height = 200;
      var radius = Math.min(width, height) / 2;

      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var chart = d3.select(element[0]).select('.chart');
      var svg = chart.append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
          .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

      // Declare the function to render dynamic elements.
      ctrl.render = function() {
        var paths = svg.selectAll('path')
          .data(pie(ctrl.revenueByProduct));

        // Merge new sections with existing sections and apply operations
        // to both.
        paths.enter().append('path')
          .merge(paths)
            .attr('d', arc)
            .attr('fill', function(d) { return color(d.data.key); });

        // Remove unecessary sections
        paths.exit().remove();
      };

      scope.$watch('ctrl.year', function(newValue, oldValue) {
        // Only regroup the data when the year changes.
        // Group the year data by product and then sum the revenue.
        ctrl.revenueByProduct = d3.nest()
          .key(function(d) { return d.product; })
          .rollup(function(entries) {
            return d3.sum(entries, function(d) { return d.revenue; });
          })
          .entries(ctrl.data[ctrl.year]);

        ctrl.render();
      });
    }
  };
});
})();
