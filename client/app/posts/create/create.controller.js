'use strict';
var filePicked = null;
var filePickedTwo = null;
var filePickedThree = null;
var filePickedFour = null;
var filePickedFive = null;

(function(){

class CreateComponent {
  constructor($scope, $http, $location, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.getCurrentUser = Auth.getCurrentUser;
    this.message = 'Wat!';
    this.hiddenfields = true;
    // use the window to access the filePicked variables starting on line 2
    window.filePicked = this.filePicked;
    window.filePickedTwo = this.filePickedTwo;
    window.filePickedThree = this.filePickedThree;
    window.filePickedFour = this.filePickedFour;
    window.filePickedFive = this.filePickedFive;
    window.$ctrl = this;
    this.data = [];
  }

// this is how I got the filestack button to open the upload window
  filePicked(event) {
    console.log(event);
    window.$ctrl.imageURL1 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }

  filePickedTwo(event) {
    window.$ctrl.imageURL2 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }

  filePickedThree(event) {
    window.$ctrl.imageURL3 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }

  filePickedFour(event) {
    window.$ctrl.imageURL4 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }

  filePickedFive(event) {
    window.$ctrl.imageURL5 = event.fpfiles[0].url;
    window.$ctrl.$scope.$apply();
  }

  reveal() {
    // return true;
    this.hiddenfields = !this.hiddenfields;
  }

  // do $http request here. Should automatically use the api endpoint
  submit() {
    if (this.post) {
      console.log(this.imageURL);
      console.log(this.post);
      console.log(this.getCurrentUser().name);
      this.$http.post('/api/posts', {
        // below are values I want to pass into the db
        title: this.post.title,
        author: this.getCurrentUser().name,
        synopsis: this.post.synopsis,
        image_1: this.imageURL1,
        caption_1: this.post.caption_1,
        image_2: this.imageURL2,
        caption_2: this.post.caption_2,
        image_3: this.post.imageURL3,
        caption_3: this.post.caption_3,
        image_4: this.post.imageURL4,
        caption_4: this.post.caption_4,
        image_5: this.post.imageURL5,
        caption_5: this.post.caption_5
      })
      .then((result) => {
        this.$location.path('/posts/author/' + this.getCurrentUser().name);
      });
      this.post.title = '';
    }
  }


}

angular.module('docExtrapolationApp')
  .component('create', {
    templateUrl: 'app/posts/create/create.html',
    controller: CreateComponent
  });

})();
