'use strict';
var filePicked = null;

(function(){

class CreateComponent {
  constructor($scope, $http, $location, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.getCurrentUser = Auth.getCurrentUser;
    this.message = 'Wat!';
    this.hiddenfields = true;
    window.filePicked = this.filePicked;
    window.$ctrl = this;
    this.files = [];
  }

  filePicked(event) {
    console.log(event);
    window.$ctrl.imageURL = event.fpfile.url;
    window.$ctrl.$scope.$apply();
  }

  reveal() {
    // return true;
    this.hiddenfields = !this.hiddenfields;
  }

  uploaded(event) {
    console.log(event);
    console.log(this.uploaddata);
  }

  upload() {
    console.log('clicked upload!');
    this.filepicker.pick(
      {
        mimetype: 'image/*',
        container: 'window',
        services: ['COMPUTER', 'FACEBOOK', 'CLOUDAPP'],
      },
      function(Blob){
        console.log(replaceHtmlChars(JSON.stringify(Blob)));
      },
      function(FPError){
        //print errors to console
        console.log(FPError.toString());
      }
    );
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
        image_1: this.imageURL,
        caption_1: this.post.caption_1,
        image_2: this.post.image_2,
        caption_2: this.post.caption_2,
        image_3: this.post.image_3,
        caption_3: this.post.caption_3,
        image_4: this.post.image_4,
        caption_4: this.post.caption_4,
        image_5: this.post.image_5,
        caption_5: this.post.caption_5
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
