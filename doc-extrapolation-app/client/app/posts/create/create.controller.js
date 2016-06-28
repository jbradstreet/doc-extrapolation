'use strict';
(function(){

class CreateComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('docExtrapolationApp')
  .component('create', {
    templateUrl: 'app/posts/create/create.html',
    controller: CreateComponent
  });

})();
