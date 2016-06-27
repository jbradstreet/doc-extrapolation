'use strict';

angular.module('docExtrapolationApp.admin')
  .config(function($routeProvider) {
    $routeProvider.when('/admin', {
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      // line 10 only lets the admin see the admin route!
      authenticate: 'admin'
    });
  });
