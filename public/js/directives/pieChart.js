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
      var margin = 2;
      var width = 200;
      var pieHeight = 200;
      var legendHeight = 70;
      var radius = Math.min(width, pieHeight) / 2 - margin;

      var legendRectSize = 18;
      var legendSpacing = 4;

      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var svg = d3.select(element[0]).select('.chart').append('svg')
        .attr('width', width)
        .attr('height', pieHeight + legendHeight);
      var chart = svg.append('g')
        .attr('class', 'pie-chart')
        .attr('transform',
          'translate(' + (width/2) + ',' + (pieHeight/2) + ')');

      // Declare the function to render dynamic elements.
      ctrl.render = function() {
        var paths = chart.selectAll('path')
          .data(pie(ctrl.revenueByProduct));
        var texts = chart.selectAll('text')
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

        // Add legend.
        var legend = svg.selectAll('.legend')
          .data(color.domain());

        // Append new elements
        legend.enter().append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var vert = legendSpacing + pieHeight + (i * height);
            return 'translate(' + legendSpacing + ',' + vert + ')';
          })
          .each(function() {
            var me = d3.select(this);

            me.append('rect')
              .attr('width', legendRectSize)
              .attr('height', legendRectSize);
            me.append('text')
              .attr('x', legendRectSize + legendSpacing)
              .attr('y', legendRectSize - legendSpacing);
          })
          // Merge new elements with existing elements and update fields.
          .merge(legend)
          .each(function() {
            d3.select(this).select('rect')
              .style('fill', color)
              .style('stroke', color);

            d3.select(this).select('text')
              .text(function(d) { return d; });
          });

        legend.exit().remove();
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
