'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filePicked = null;

(function () {
  var CreateComponent = function () {
    function CreateComponent($scope, $http, $location, Auth) {
      _classCallCheck(this, CreateComponent);

      this.$http = $http;
      this.$scope = $scope;
      this.$location = $location;
      this.getCurrentUser = Auth.getCurrentUser;
      this.message = 'Wat!';
      this.hiddenfields = true;
      window.filePicked = this.filePicked;
      window.$ctrl = this;
      this.files = [];
    }

    _createClass(CreateComponent, [{
      key: 'filePicked',
      value: function filePicked(event) {
        console.log(event);
        window.$ctrl.imageURL = event.fpfile.url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'reveal',
      value: function reveal() {
        // return true;
        this.hiddenfields = !this.hiddenfields;
      }
    }, {
      key: 'uploaded',
      value: function uploaded(event) {
        console.log(event);
        console.log(this.uploaddata);
      }
    }, {
      key: 'upload',
      value: function upload() {
        console.log('clicked upload!');
        this.filepicker.pick({
          mimetype: 'image/*',
          container: 'window',
          services: ['COMPUTER', 'FACEBOOK', 'CLOUDAPP']
        }, function (Blob) {
          console.log(replaceHtmlChars(JSON.stringify(Blob)));
        }, function (FPError) {
          //print errors to console
          console.log(FPError.toString());
        });
      }

      // do $http request here. Should automatically use the api endpoint

    }, {
      key: 'submit',
      value: function submit() {
        var _this = this;

        if (this.post) {
          console.log(this.imageURL);
          console.log(this.post);
          console.log(this.getCurrentUser().name);
          this.$http.post('/api/posts', {
            // below are values I want to pass into the db
            title: this.post.title,
            author: this.getCurrentUser().name,
            synopsis: this.post.synopsis,
            image_1: this.imageURL,
            caption_1: this.post.caption_1,
            image_2: this.post.image_2,
            caption_2: this.post.caption_2,
            image_3: this.post.image_3,
            caption_3: this.post.caption_3,
            image_4: this.post.image_4,
            caption_4: this.post.caption_4,
            image_5: this.post.image_5,
            caption_5: this.post.caption_5
          }).then(function (result) {
            _this.$location.path('/posts');
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
