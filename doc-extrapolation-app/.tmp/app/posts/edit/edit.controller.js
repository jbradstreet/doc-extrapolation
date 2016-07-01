'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var EditComponent = function () {
    function EditComponent($http, $routeParams, $location) {
      _classCallCheck(this, EditComponent);

      this.$http = $http;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.message = "You made it!";
      // line 9 has all objects in the array
      this.singlePost = [];
    }

    _createClass(EditComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts/' + this.$routeParams.postID).then(function (response) {
          _this.singlePost = response.data;
          console.log(_this.singlePost);
        });
      }
    }, {
      key: 'save',
      value: function save() {
        var _this2 = this;

        if (this.post) {
          console.log("button works");
          // post.$update();
          this.$http.put('/api/posts' + this.$routeParams.postID, {
            // below are values I want to pass into the db
            title: this.post.title,
            synopsis: this.post.synopsis,
            image_1: this.post.image_1,
            caption_1: this.post.caption_1
          }).then(function () {
            _this2.$location.path('/posts/' + _this2.$routeParams.postID);
          });
        }
      }
    }, {
      key: 'delete',
      value: function _delete() {
        if (this.post) {
          console.log("delete clicked");
          this.$http.delete('/api/posts/' + this.$routeParams.postID);
          this.$location.path('/users');
        }
      }
    }]);

    return EditComponent;
  }();

  angular.module('docExtrapolationApp').component('edit', {
    templateUrl: 'app/posts/edit/edit.html',
    controller: EditComponent
  });
})();
//# sourceMappingURL=edit.controller.js.map
