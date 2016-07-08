'use strict';
var filePicked = null;
var filePickedAgain = null;

(function(){

class EditComponent {
  constructor($scope, $http, $routeParams, $location) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.message = 'You made it!';
    // line 15 has all objects in the array
    this.singlePost = [];
    this.hiddenfields = true;
    window.filePicked = this.filePicked;
    window.filePickedAgain = this.filePickedAgain;
    window.$ctrl = this;
  }

  $onInit() {
    this.$http.get('/api/posts/' + this.$routeParams.postID)
      .then(response => {
        this.singlePost = response.data;
        console.log(this.singlePost);
      });
  }

  filePicked(event) {
    window.$ctrl.imageURL1 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }

  filePickedAgain(event) {
    window.$ctrl.imageURL2 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }


  reveal(){
    this.hiddenfields = !this.hiddenfields;
  }

  hideextra() {
    if (!this.singlePost.image_2) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (this.singlePost) {
      var postid = this.$routeParams.postID;

      this.$http.put('/api/posts/' + this.$routeParams.postID, {
        title: this.singlePost.title,
        synopsis: this.singlePost.synopsis,
        image_1: this.imageURL1,
        caption_1: this.singlePost.caption_1,
        image_2: this.imageURL2,
        caption_2: this.singlePost.caption_2,
        image_3: this.singlePost.image_3,
        caption_3: this.singlePost.caption_3,
        image_4: this.singlePost.image_4,
        caption_4: this.singlePost.caption_4,
        image_5: this.singlePost.image_5,
        caption_5: this.singlePost.caption_5
      })
      .then((result) => {
        console.log(result);
        this.$location.path('/posts/' + postid);
      });
    } else if (!this.singlePost) {
      this.$http.post('api/posts/' + this.$routeParams.postID, {
        image_2: this.singlePost.image_2,
        caption_2: this.singlePost.caption_2,
        image_3: this.singlePost.image_3,
        caption_3: this.singlePost.caption_3,
        image_4: this.singlePost.image_4,
        caption_4: this.singlePost.caption_4,
        image_5: this.singlePost.image_5,
        caption_5: this.singlePost.caption_5
      })
      .then((result) => {
        console.log(result);
        this.$location.path('/posts/' + postid);
      });
    }
  }

  delete() {
    if (this.singlePost) {
      var postid = this.$routeParams.postID;

      this.$http.delete('/api/posts/' + this.$routeParams.postID, {
        title: this.singlePost.title,
        synopsis: this.singlePost.synopsis,
        image_1: this.singlePost.image_1,
        caption_1: this.singlePost.caption_1
      })
      .then((result) => {
        console.log(result);
        // add postid at the end of the url, see line 88
        this.$location.path('/posts/');
      });
    }
  }

}

angular.module('docExtrapolationApp')
  .component('edit', {
    templateUrl: 'app/posts/edit/edit.html',
    controller: EditComponent
  });

})();