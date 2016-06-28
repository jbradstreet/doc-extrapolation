'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var UsersComponent = function UsersComponent() {
    _classCallCheck(this, UsersComponent);

    this.message = 'Hello';
  };

  angular.module('docExtrapolationApp').component('users', {
    templateUrl: 'app/users/users.html',
    controller: UsersComponent
  });
})();
//# sourceMappingURL=users.controller.js.map
