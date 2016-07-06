'use strict';
(function(){

class AuthorComponent {
  constructor($http, $routeParams) {
    this.message = 'Hello';
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.authorPosts = [];
  }

  $onInit() {
    this.$http.get('/api/posts/author' + this.$routeParams.author)
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
