'use strict';
(function(){

class AuthorComponent {
  constructor($http, $routeParams, $location) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.message = 'Hello';
    this.authorPosts = [];
  }

  $onInit() {
    this.$http.get('/api/posts/author' + this.$routeParams.post.author)
      .then(response => {
        this.authorPosts = response.data;
        console.log(this.authorPosts);
      });
  }



}

angular.module('docExtrapolationApp')
  .component('author', {
    templateUrl: 'app/posts/author/author.html',
    controller: AuthorComponent
  });

})();
