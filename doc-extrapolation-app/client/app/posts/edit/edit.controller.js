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

  update() {
    if (this.singlePost) {
      // post.$update();
      var postid = this.$routeParams.postID
      this.$http.put('/api/posts/' + this.$routeParams.postID, {
        title: this.singlePost.title,
        synopsis: this.singlePost.synopsis,
        image_1: this.singlePost.image_1,
        caption_1: this.singlePost.caption_1
      })
      .then((result) => {
        console.log(result)
        this.$location.path('/posts/' + postid);
      });
    }
  }

  delete() {
    if (this.post) {
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
