'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ShowPostComponent = function () {
    function ShowPostComponent($http, $routeParams, $location) {
      _classCallCheck(this, ShowPostComponent);

      this.$http = $http;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.message = "You made it!";
      // line 9 has all objects in the array
      this.singlePost = [];
    }

    _createClass(ShowPostComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts/' + this.$routeParams.postID).then(function (response) {
          _this.singlePost = response.data;
          console.log(_this.singlePost);
        });
      }
    }, {
      key: 'edit',
      value: function edit() {
        console.log("clicked button");
        this.$location.path('/post/' + this.$routeParams.postID);
      }
    }]);

    return ShowPostComponent;
  }();

  angular.module('docExtrapolationApp').component('showpost', {
    templateUrl: 'app/posts/showpost/showpost.html',
    controller: ShowPostComponent
  });
})();
//# sourceMappingURL=showpost.controller.js.map
