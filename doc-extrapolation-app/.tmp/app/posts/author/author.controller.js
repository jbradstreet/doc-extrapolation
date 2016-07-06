'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AuthorComponent = function () {
    function AuthorComponent($http, $routeParams) {
      _classCallCheck(this, AuthorComponent);

      this.message = 'Hello';
      this.$http = $http;
      this.$routeParams = $routeParams;
      this.authorPosts = [];
    }

    _createClass(AuthorComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts/author' + this.$routeParams.author).then(function (response) {
          _this.authorPosts = response.data;
          console.log(_this.authorPosts);
        });
      }
    }]);

    return AuthorComponent;
  }();

  angular.module('docExtrapolationApp').component('author', {
    templateUrl: 'app/posts/author/author.html',
    controller: AuthorComponent
  });
})();
//# sourceMappingURL=author.controller.js.map
