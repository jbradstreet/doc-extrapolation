'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var PostsComponent = function PostsComponent() {
    _classCallCheck(this, PostsComponent);

    this.message = 'Hello';
  };

  angular.module('docExtrapolationApp').component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsComponent
  });
})();
//# sourceMappingURL=posts.controller.js.map
