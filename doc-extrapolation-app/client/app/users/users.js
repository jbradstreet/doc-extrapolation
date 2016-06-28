'use strict';

angular.module('docExtrapolationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users', {
        template: '<users></users>'
      });
  });
