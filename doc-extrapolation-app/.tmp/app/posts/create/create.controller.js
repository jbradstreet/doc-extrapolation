'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filePicked = null;
var filePickedAgain = null;

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
      // use the window to access the filePicked variable on line 2
      window.filePicked = this.filePicked;
      window.filePickedAgain = this.filePickedAgain;
      window.$ctrl = this;
      this.data = [];
    }

    // this is how I got the filestack button to open the upload window


    _createClass(CreateComponent, [{
      key: 'filePicked',
      value: function filePicked(event) {
        // add logic to iterate through array of objects
        window.$ctrl.imageURL1 = event.fpfiles[0].url;
        // window.$ctrl.imageURL2 = event.fpfiles[1].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedAgain',
      value: function filePickedAgain(event) {
        // add logic to iterate through array of objects
        window.$ctrl.imageURL2 = event.fpfiles[0].url;
        // window.$ctrl.imageURL2 = event.fpfiles[1].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'reveal',
      value: function reveal() {
        // return true;
        this.hiddenfields = !this.hiddenfields;
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
            image_1: this.imageURL1,
            caption_1: this.post.caption_1,
            image_2: this.imageURL2,
            caption_2: this.post.caption_2
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
