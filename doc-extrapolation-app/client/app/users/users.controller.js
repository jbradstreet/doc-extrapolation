'use strict';
(function(){

class UsersComponent {
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
    this.allUsers = [];
  }

  $onInit() {
    this.$http.get('/api/users')
      .then(response => {
        this.allUsers = response.data;
        console.log(this.allUsers);
      });
  }



}

angular.module('docExtrapolationApp')
  .component('users', {
    templateUrl: 'app/users/users.html',
    controller: UsersComponent
  });

})();
