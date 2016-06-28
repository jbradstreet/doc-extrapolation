'use strict';
(function(){

class UsersComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('docExtrapolationApp')
  .component('users', {
    templateUrl: 'app/users/users.html',
    controller: UsersComponent
  });

})();
