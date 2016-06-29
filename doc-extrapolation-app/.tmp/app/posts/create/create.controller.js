'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var CreateComponent = function () {
    function CreateComponent($http) {
      _classCallCheck(this, CreateComponent);

      this.$http = $http;
      this.message = 'Wat!';
    }

    // do $http request here. Should automatically use the api endpoint


    _createClass(CreateComponent, [{
      key: 'submit',
      value: function submit() {
        if (this.post) {
          console.log(this.post);
          this.$http.post('/api/create', {
            title: this.post.title
          });
          this.post.title = '';
        }
      }
    }]);

    return CreateComponent;
  }();

  angular.module('docExtrapolationApp').component('create', {
    templateUrl: 'app/posts/create/create.html',
    controller: CreateComponent
  });
})();
//# sourceMappingURL=create.controller.js.map
