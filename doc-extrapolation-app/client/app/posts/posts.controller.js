'use strict';
(function(){

class PostsComponent {
  constructor($http, Auth) {
    this.message = 'Hello';
    this.$http = $http;
    this.allPosts = [];
  }

  $onInit() {
    this.$http.get('/api/posts')
      .then(response => {
        this.allPosts = response.data;
        console.log(this.allPosts);
      });
  }

}

angular.module('docExtrapolationApp')
  .component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsComponent
  });

})();
