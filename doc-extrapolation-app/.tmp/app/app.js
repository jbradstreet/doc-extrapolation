'use strict';

angular.module('docExtrapolationApp', ['docExtrapolationApp.auth', 'docExtrapolationApp.admin', 'docExtrapolationApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'validation.match', 'angular-filepicker', 'ngParallax']).config(function ($routeProvider, $locationProvider, filepickerProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
  // line 14 defines the API key globally. Do not need to add it in all upload buttons.
  filepickerProvider.setKey('AjhGHe86aRlGvhu7k6IBjz');
});
//# sourceMappingURL=app.js.map
