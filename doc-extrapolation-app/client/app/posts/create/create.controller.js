'use strict';
(function(){

class CreateComponent {
  constructor($scope, $http, $location, Auth, filepickerService) {
    this.$http = $http;
    this.$location = $location;
    this.getCurrentUser = Auth.getCurrentUser;
    this.filepickerService = filepickerService;
    this.message = 'Wat!';
    this.hiddenfields = true;
  }

  reveal() {
    // return true;
    this.hiddenfields = !this.hiddenfields;
  }

  upload() {
    console.log('clicked upload!');
    this.filepickerService.pick(
      {
        mimetype: 'image/*',
        language: 'en',
        services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
        openTo: 'IMAGE_SEARCH'
      },
      function(Blob){
        console.log(JSON.stringify(Blob));
        // this.files.push(Blob);
        // this.post.image_1 = image;
        // this.$apply();
      }
    );
  }


  // do $http request here. Should automatically use the api endpoint
  submit() {
    if (this.post) {
      console.log(this.post);
      console.log(this.getCurrentUser().name);
      this.$http.post('/api/posts', {
        // below are values I want to pass into the db
        title: this.post.title,
        author: this.getCurrentUser().name,
        synopsis: this.post.synopsis,
        image_1: this.post.image_1,
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
