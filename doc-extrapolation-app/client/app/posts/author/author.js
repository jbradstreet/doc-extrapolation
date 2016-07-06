'use strict';

angular.module('docExtrapolationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('posts/author/', {
        template: '<author></author>'
      });
  });
