'use strict';
(function(){

class ShowPostComponent {
  constructor($http, $routeParams, $location) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.message = "You made it!";
    // line 9 has all objects in the array
    this.singlePost = [];
  }

  $onInit() {
    this.$http.get('/api/posts/' + this.$routeParams.postID)
      .then(response => {
        this.singlePost = response.data;
        console.log(this.singlePost);
      });
  }

  edit() {
    console.log("clicked button")
    this.$location.path('/post/' + this.$routeParams.postID)
  }

}

angular.module('docExtrapolationApp')
  .component('showpost', {
    templateUrl: 'app/posts/showpost/showpost.html',
    controller: ShowPostComponent
  });

})();
