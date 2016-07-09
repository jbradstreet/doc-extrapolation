'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filePicked = null;
var filePickedTwo = null;

(function () {
  var EditComponent = function () {
    function EditComponent($scope, $http, $routeParams, $location) {
      _classCallCheck(this, EditComponent);

      this.$scope = $scope;
      this.$http = $http;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.message = 'You made it!';
      // line 15 has all objects in the array
      this.singlePost = [];
      this.hiddenfields = true;
      window.filePicked = this.filePicked;
      window.filePickedTwo = this.filePickedTwo;
      window.$ctrl = this;
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
      key: 'filePicked',
      value: function filePicked(event) {
        window.$ctrl.imageURL1 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedTwo',
      value: function filePickedTwo(event) {
        window.$ctrl.imageURL2 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'reveal',
      value: function reveal() {
        this.hiddenfields = !this.hiddenfields;
      }
    }, {
      key: 'hideextra',
      value: function hideextra() {
        if (!this.singlePost.image_2) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'update',
      value: function update() {
        var _this2 = this;

        if (this.singlePost) {
          var postid = this.$routeParams.postID;

          this.$http.put('/api/posts/' + this.$routeParams.postID, {
            title: this.singlePost.title,
            synopsis: this.singlePost.synopsis,
            image_1: this.imageURL1,
            caption_1: this.singlePost.caption_1,
            image_2: this.imageURL2,
            caption_2: this.singlePost.caption_2,
            image_3: this.singlePost.image_3,
            caption_3: this.singlePost.caption_3,
            image_4: this.singlePost.image_4,
            caption_4: this.singlePost.caption_4,
            image_5: this.singlePost.image_5,
            caption_5: this.singlePost.caption_5
          }).then(function (result) {
            console.log(result);
            _this2.$location.path('/posts/' + postid);
          });
        } else if (!this.singlePost) {
          this.$http.post('api/posts/' + this.$routeParams.postID, {
            image_2: this.singlePost.image_2,
            caption_2: this.singlePost.caption_2,
            image_3: this.singlePost.image_3,
            caption_3: this.singlePost.caption_3,
            image_4: this.singlePost.image_4,
            caption_4: this.singlePost.caption_4,
            image_5: this.singlePost.image_5,
            caption_5: this.singlePost.caption_5
          }).then(function (result) {
            console.log(result);
            _this2.$location.path('/posts/' + postid);
          });
        }
      }
    }, {
      key: 'delete',
      value: function _delete() {
        var _this3 = this;

        if (this.singlePost) {
          var postid = this.$routeParams.postID;

          this.$http.delete('/api/posts/' + this.$routeParams.postID, {
            title: this.singlePost.title,
            synopsis: this.singlePost.synopsis,
            image_1: this.singlePost.image_1,
            caption_1: this.singlePost.caption_1
          }).then(function (result) {
            console.log(result);
            // add postid at the end of the url, see line 88
            _this3.$location.path('/posts/');
          });
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
