'use strict';
(function(){

class EditComponent {
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

  save() {
    if (this.post) {
      console.log("button works");
      // post.$update();
      this.$http.put('/api/posts' + this.$routeParams.postID, {
        // below are values I want to pass into the db
        title: this.post.title,
        synopsis: this.post.synopsis,
        image_1: this.post.image_1,
        caption_1: this.post.caption_1
      })
      .then(() => {
        this.$location.path('/posts/' + this.$routeParams.postID);
      });
    }
  }

  delete() {
    if (this.post) {
      console.log("delete clicked");
      this.$http.delete('/api/posts/' + this.$routeParams.postID);
      this.$location.path('/users');
    }
  }

}

angular.module('docExtrapolationApp')
  .component('edit', {
    templateUrl: 'app/posts/edit/edit.html',
    controller: EditComponent
  });

})();
