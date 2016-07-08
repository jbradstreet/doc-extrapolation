'use strict';

angular.module('docExtrapolationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts/:postID/edit', {
        template: '<edit></edit>'
      });
  });
