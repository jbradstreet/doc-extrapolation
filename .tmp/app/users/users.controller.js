'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var UsersComponent = function () {
    function UsersComponent($http) {
      _classCallCheck(this, UsersComponent);

      this.message = 'Hello';
      this.$http = $http;
      this.allUsers = [];
    }

    _createClass(UsersComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/users').then(function (response) {
          _this.allUsers = response.data;
          console.log(_this.allUsers);
        });
      }
    }]);

    return UsersComponent;
  }();

  angular.module('docExtrapolationApp').component('users', {
    templateUrl: 'app/users/users.html',
    controller: UsersComponent
  });
})();
//# sourceMappingURL=users.controller.js.map
