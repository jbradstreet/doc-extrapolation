'use strict';

angular.module('docExtrapolationApp.auth', ['docExtrapolationApp.constants',
    'docExtrapolationApp.util', 'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
