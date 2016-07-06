'use strict';

angular.module('docExtrapolationApp', ['docExtrapolationApp.auth', 'docExtrapolationApp.admin',
    'docExtrapolationApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'ui.bootstrap', 'validation.match', 'angular-filepicker', 'ngParallax'
  ])
  .config(function($routeProvider, $locationProvider, filepickerProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
    filepickerProvider.setKey('AjhGHe86aRlGvhu7k6IBjz');
  });
