'use strict';

describe('Component: UsersComponent', function () {

  // load the controller's module
  beforeEach(module('docExtrapolationApp'));

  var UsersComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UsersComponent = $componentController('UsersComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
