'use strict';
(function(){

class PostsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('docExtrapolationApp')
  .component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsComponent
  });

})();
