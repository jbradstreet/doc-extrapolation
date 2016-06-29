'use strict';
(function(){

class CreateComponent {
  constructor($http) {
    this.$http = $http;
    this.message = 'Wat!';
  }

  // do $http request here. Should automatically use the api endpoint
  submit() {
    if (this.post) {
      console.log(this.post)
      this.$http.post('/api/posts', {
        // below are values I want to pass into the db
        title: this.post.title,
        synopsis: this.post.synopsis,
        image_1: this.post.image_1,
        caption_1: this.post.caption_1
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
