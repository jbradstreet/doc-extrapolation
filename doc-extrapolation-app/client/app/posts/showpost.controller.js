'use strict';
(function(){

class ShowPostComponent {
  constructor($http) {
    this.$http = $http;
    this.message = "You made it!";
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
  .component('showPost', {
    templateUrl: 'app/posts/showpost.html',
    controller: ShowPostComponent
  });

})();
