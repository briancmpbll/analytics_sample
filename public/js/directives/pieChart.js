(function() {
'use strict';

var app = angular.module('analyticsApp');

app.directive('pieChart', ['$filter', function($filter) {
  return {
    restrict: 'E',
    templateUrl: '/templates/_pie-chart.html',
    scope: {
      year: '<',
      data: '<',
      onProductClicked: '&'
    },
    controller: angular.noop,
    controllerAs: 'ctrl',
    bindToController: true,

    link: function(scope, element, attrs, ctrl) {
      // Setup static elements.
      var width = 200;
      var height = 200;
      var radius = Math.min(width, height) / 2 - 2;

      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      var color = d3.scaleOrdinal(d3.schemeCategory10);

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
        var texts = svg.selectAll('text')
          .data(pie(ctrl.revenueByProduct));

        // Merge new sections with existing sections and apply operations
        // to both.
        paths.enter().append('path')
          .on('click', function(d) {
            ctrl.onProductClicked( {product: d.data.key} );
          })
          .merge(paths)
            .attr('d', arc)
            .attr('fill', function(d) { return color(d.data.key); })
            .attr('stroke', function(d) { return color(d.data.key); });

        texts.enter().append('text')
          .merge(texts)
            .attr('transform', function(d) {
              d.innerRadius = 0;
              d.outerRadius = radius;
              return 'translate(' + arc.centroid(d) + ')';
            })
            .attr('text-anchor', 'middle')
            .text(function(d) {
              return $filter('millions')(d.value);
            });

        // Remove unecessary sections
        paths.exit().remove();
        texts.exit().remove();
      };

      scope.$watch('ctrl.year', function() {
        // Only regroup the data when the year changes.
        // Group the year data by product and then sum the revenue.
        ctrl.revenueByProduct = d3.nest()
          .key(function(d) { return d.product; }).sortKeys(d3.ascending)
          .rollup(function(entries) {
            return d3.sum(entries, function(d) { return d.revenue; });
          })
          .entries(ctrl.data[ctrl.year]);

        ctrl.render();
      });
    }
  };
}]);
})();
