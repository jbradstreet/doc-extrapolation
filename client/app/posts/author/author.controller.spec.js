'use strict';

describe('Component: AuthorComponent', function () {

  // load the controller's module
  beforeEach(module('docExtrapolationApp'));

  var AuthorComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AuthorComponent = $componentController('AuthorComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
