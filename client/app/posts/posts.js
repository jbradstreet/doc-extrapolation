'use strict';

angular.module('docExtrapolationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts', {
        template: '<posts></posts>'
      });
  });
