'use strict';
(function(){

class CreateComponent {
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.message = 'Wat!';
    this.hiddenfields = true;
  }

  reveal() {
    // return true;
    this.hiddenfields = !this.hiddenfields;
  }


  // do $http request here. Should automatically use the api endpoint
  submit() {
    if (this.post) {
      console.log(this.post);
      this.$http.post('/api/posts', {
        // below are values I want to pass into the db
        title: this.post.title,
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
      // this.post.title = '';
    }
  }


}

angular.module('docExtrapolationApp')
  .component('create', {
    templateUrl: 'app/posts/create/create.html',
    controller: CreateComponent
  });

})();
