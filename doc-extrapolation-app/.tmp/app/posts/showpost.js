'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/posts/:postID', {
    template: '<showpost></showpost>'
  });
});
//# sourceMappingURL=showpost.js.map
