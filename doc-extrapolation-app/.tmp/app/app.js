'use strict';

angular.module('docExtrapolationApp', ['docExtrapolationApp.auth', 'docExtrapolationApp.admin', 'docExtrapolationApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'validation.match']).config(function ($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
