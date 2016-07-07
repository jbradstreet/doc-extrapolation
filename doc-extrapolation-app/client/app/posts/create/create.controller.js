'use strict';
var filePicked = null;
var filePickedAgain = null;

(function(){

class CreateComponent {
  constructor($scope, $http, $location, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.getCurrentUser = Auth.getCurrentUser;
    this.message = 'Wat!';
    this.hiddenfields = true;
    // use the window to access the filePicked variable on line 2
    window.filePicked = this.filePicked;
    window.filePickedAgain = this.filePickedAgain;
    window.$ctrl = this;
    this.data = [];
  }

// this is how I got the filestack button to open the upload window
  filePicked(event) {
    // add logic to iterate through array of objects
    window.$ctrl.imageURL1 = event.fpfiles[0].url;
    // window.$ctrl.imageURL2 = event.fpfiles[1].url;
    window.$ctrl.$scope.$apply();
  }

  filePickedAgain(event) {
    // add logic to iterate through array of objects
    window.$ctrl.imageURL2 = event.fpfiles[0].url;
    // window.$ctrl.imageURL2 = event.fpfiles[1].url;
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
        // image_3: this.post.image_3,
        // caption_3: this.post.caption_3,
        // image_4: this.post.image_4,
        // caption_4: this.post.caption_4,
        // image_5: this.post.image_5,
        // caption_5: this.post.caption_5
      })
      .then((result) => {
        this.$location.path('/posts');
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
