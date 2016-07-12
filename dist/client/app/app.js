'use strict';

angular.module('docExtrapolationApp', ['docExtrapolationApp.auth', 'docExtrapolationApp.admin', 'docExtrapolationApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'validation.match', 'ngParallax']).config(function ($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map

'use strict';

angular.module('docExtrapolationApp.admin', ['docExtrapolationApp.auth', 'ngRoute']);
//# sourceMappingURL=admin.module.js.map

'use strict';

angular.module('docExtrapolationApp.auth', ['docExtrapolationApp.constants', 'docExtrapolationApp.util', 'ngCookies', 'ngRoute']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map

'use strict';

angular.module('docExtrapolationApp.util', []);
//# sourceMappingURL=util.module.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  }).when('/logout', {
    name: 'logout',
    referrer: '/',
    template: '',
    controller: function controller($location, $route, Auth) {
      var referrer = $route.current.params.referrer || $route.current.referrer || '/';
      Auth.logout();
      $location.path(referrer);
    }
  }).when('/signup', {
    templateUrl: 'app/account/signup/signup.html',
    controller: 'SignupController',
    controllerAs: 'vm'
  }).when('/settings', {
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm',
    authenticate: true
  });
}).run(function ($rootScope) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
      next.referrer = current.originalPath;
    }
  });
});
//# sourceMappingURL=account.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
  function LoginController(Auth, $location) {
    _classCallCheck(this, LoginController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$location = $location;
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function login(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Logged in, redirect to home
          _this.$location.path('/');
        }).catch(function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }]);

  return LoginController;
}();

angular.module('docExtrapolationApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = function () {
  function SettingsController(Auth) {
    _classCallCheck(this, SettingsController);

    this.Auth = Auth;
  }

  _createClass(SettingsController, [{
    key: 'changePassword',
    value: function changePassword(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.changePassword(this.user.oldPassword, this.user.newPassword).then(function () {
          _this.message = 'Password successfully changed.';
        }).catch(function () {
          form.password.$setValidity('mongoose', false);
          _this.errors.other = 'Incorrect password';
          _this.message = '';
        });
      }
    }
  }]);

  return SettingsController;
}();

angular.module('docExtrapolationApp').controller('SettingsController', SettingsController);
//# sourceMappingURL=settings.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupController = function () {
  //end-non-standard

  function SignupController(Auth, $location) {
    _classCallCheck(this, SignupController);

    this.Auth = Auth;
    this.$location = $location;
  }
  //start-non-standard

  _createClass(SignupController, [{
    key: 'register',
    value: function register(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Account created, redirect to home
          _this.$location.path('/');
        }).catch(function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this.errors[field] = error.message;
          });
        });
      }
    }
  }]);

  return SignupController;
}();

angular.module('docExtrapolationApp').controller('SignupController', SignupController);
//# sourceMappingURL=signup.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AdminController = function () {
    function AdminController(User) {
      _classCallCheck(this, AdminController);

      // Use the User $resource to fetch all users
      this.users = User.query();
    }

    _createClass(AdminController, [{
      key: 'delete',
      value: function _delete(user) {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
      }
    }]);

    return AdminController;
  }();

  angular.module('docExtrapolationApp.admin').controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map

'use strict';

angular.module('docExtrapolationApp.admin').config(function ($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'admin',
    // line 10 only lets the admin see the admin route!
    authenticate: 'admin'
  });
});
//# sourceMappingURL=admin.router.js.map

"use strict";

(function (angular, undefined) {
	angular.module("docExtrapolationApp.constants", []).constant("appConfig", {
		"userRoles": ["guest", "user", "admin"]
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.awesomeThings = [];
      this.myPattern = "../../assets/images/ideawoman.jpg";
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/things').then(function (response) {
          _this.awesomeThings = response.data;
        });
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        if (this.newThing) {
          this.$http.post('/api/things', {
            name: this.newThing
          });
          this.newThing = '';
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/things/' + thing._id);
      }
    }]);

    return MainController;
  }();

  angular.module('docExtrapolationApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/', {
    template: '<main></main>'
  });
});
//# sourceMappingURL=main.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AuthorComponent = function () {
    function AuthorComponent($http, $routeParams, $location) {
      _classCallCheck(this, AuthorComponent);

      this.$http = $http;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.authorPosts = [];
    }

    _createClass(AuthorComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts/author/' + this.$routeParams.author).then(function (response) {
          _this.authorPosts = response.data;
          console.log(_this.authorPosts);
        });
      }
    }]);

    return AuthorComponent;
  }();

  angular.module('docExtrapolationApp').component('author', {
    templateUrl: 'app/posts/author/author.html',
    controller: AuthorComponent
  });
})();
//# sourceMappingURL=author.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/posts/author/:author', {
    template: '<author></author>'
  });
});
//# sourceMappingURL=author.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filePicked = null;
var filePickedTwo = null;
var filePickedThree = null;
var filePickedFour = null;
var filePickedFive = null;

(function () {
  var CreateComponent = function () {
    function CreateComponent($scope, $http, $location, Auth) {
      _classCallCheck(this, CreateComponent);

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


    _createClass(CreateComponent, [{
      key: 'filePicked',
      value: function filePicked(event) {
        console.log(event);
        window.$ctrl.imageURL1 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedTwo',
      value: function filePickedTwo(event) {
        console.log(event);
        window.$ctrl.imageURL2 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedThree',
      value: function filePickedThree(event) {
        console.log(event);
        window.$ctrl.imageURL3 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedFour',
      value: function filePickedFour(event) {
        window.$ctrl.imageURL4 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedFive',
      value: function filePickedFive(event) {
        window.$ctrl.imageURL5 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'reveal',
      value: function reveal() {
        // return true;
        this.hiddenfields = !this.hiddenfields;
      }

      // do $http request here. Should automatically use the api endpoint

    }, {
      key: 'submit',
      value: function submit() {
        var _this = this;

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
            image_3: this.imageURL3,
            caption_3: this.post.caption_3,
            image_4: this.imageURL4,
            caption_4: this.post.caption_4,
            image_5: this.imageURL5,
            caption_5: this.post.caption_5
          }).then(function (result) {
            _this.$location.path('/posts/author/' + _this.getCurrentUser().name);
          });
          this.post.title = '';
        }
      }
    }]);

    return CreateComponent;
  }();

  angular.module('docExtrapolationApp').component('create', {
    templateUrl: 'app/posts/create/create.html',
    controller: CreateComponent
  });
})();
//# sourceMappingURL=create.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/posts/create', {
    template: '<create></create>'
  });
});
//# sourceMappingURL=create.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filePicked = null;
var filePickedTwo = null;
var filePickedThree = null;
var filePickedFour = null;
var filePickedFive = null;

(function () {
  var EditComponent = function () {
    function EditComponent($scope, $http, $routeParams, $location, Auth) {
      _classCallCheck(this, EditComponent);

      this.$scope = $scope;
      this.$http = $http;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.getCurrentUser = Auth.getCurrentUser;
      this.message = 'You made it!';
      // line 19 has all objects in the array
      this.singlePost = [];
      window.filePicked = this.filePicked;
      window.filePickedTwo = this.filePickedTwo;
      window.filePickedThree = this.filePickedThree;
      window.filePickedFour = this.filePickedFour;
      window.filePickedFive = this.filePickedFive;
      window.$ctrl = this;
      // this.hiddenfields = true;
    }

    _createClass(EditComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts/' + this.$routeParams.postID).then(function (response) {
          _this.singlePost = response.data;
          console.log(_this.singlePost);
        });
      }
    }, {
      key: 'filePicked',
      value: function filePicked(event) {
        window.$ctrl.imageURL1 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedTwo',
      value: function filePickedTwo(event) {
        window.$ctrl.imageURL2 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedThree',
      value: function filePickedThree(event) {
        window.$ctrl.imageURL3 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedFour',
      value: function filePickedFour(event) {
        window.$ctrl.imageURL4 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }
    }, {
      key: 'filePickedFive',
      value: function filePickedFive(event) {
        window.$ctrl.imageURL5 = event.fpfiles[0].url;
        window.$ctrl.$scope.$apply();
      }

      // reveal(){
      //   this.hiddenfields = !this.hiddenfields;
      // }

      // hideextra() {
      //   if (!this.singlePost.image_2) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

    }, {
      key: 'update',
      value: function update() {
        var _this2 = this;

        if (this.singlePost) {
          var postid = this.$routeParams.postID;

          this.$http.put('/api/posts/' + this.$routeParams.postID, {
            title: this.singlePost.title,
            synopsis: this.singlePost.synopsis,
            image_1: this.imageURL1,
            caption_1: this.singlePost.caption_1,
            image_2: this.imageURL2,
            caption_2: this.singlePost.caption_2,
            image_3: this.imageURL3,
            caption_3: this.singlePost.caption_3,
            image_4: this.imageURL4,
            caption_4: this.singlePost.caption_4,
            image_5: this.imageURL5,
            caption_5: this.singlePost.caption_5
          }).then(function (result) {
            console.log(result);
            _this2.$location.path('/posts/' + postid);
          });
        } else if (!this.singlePost) {
          this.$http.post('api/posts/' + this.$routeParams.postID, {
            image_2: this.imageURL2,
            caption_2: this.singlePost.caption_2,
            image_3: this.imageURL3,
            caption_3: this.singlePost.caption_3,
            image_4: this.imageURL4,
            caption_4: this.singlePost.caption_4,
            image_5: this.imageURL5,
            caption_5: this.singlePost.caption_5
          }).then(function (result) {
            console.log(result);
            _this2.$location.path('/posts/' + postid);
          });
        }
      }
    }, {
      key: 'delete',
      value: function _delete() {
        var _this3 = this;

        if (this.singlePost) {
          var postid = this.$routeParams.postID;

          this.$http.delete('/api/posts/' + this.$routeParams.postID, {
            title: this.singlePost.title,
            synopsis: this.singlePost.synopsis,
            image_1: this.imageURL1,
            caption_1: this.singlePost.caption_1
          }).then(function (result) {
            console.log(result);
            _this3.$location.path('/posts/author/' + _this3.getCurrentUser().name);
          });
        }
      }
    }]);

    return EditComponent;
  }();

  angular.module('docExtrapolationApp').component('edit', {
    templateUrl: 'app/posts/edit/edit.html',
    controller: EditComponent
  });
})();
//# sourceMappingURL=edit.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/posts/:postID/edit', {
    template: '<edit></edit>'
  });
});
//# sourceMappingURL=edit.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var PostsComponent = function () {
    function PostsComponent($http, Auth) {
      _classCallCheck(this, PostsComponent);

      this.message = 'Hello';
      this.$http = $http;
      this.allPosts = [];
      this.sortBy = '';
    }

    _createClass(PostsComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts').then(function (response) {
          _this.allPosts = response.data;
          console.log(_this.allPosts);
        });
      }
    }]);

    return PostsComponent;
  }();

  angular.module('docExtrapolationApp').component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsComponent
  });
})();
//# sourceMappingURL=posts.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/posts', {
    template: '<posts></posts>'
  });
});
//# sourceMappingURL=posts.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ShowPostComponent = function () {
    function ShowPostComponent($http, $routeParams, $location) {
      _classCallCheck(this, ShowPostComponent);

      this.$http = $http;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.message = 'You made it!';
      // line 11 has all objects in the array
      this.singlePost = [];
    }

    _createClass(ShowPostComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/posts/' + this.$routeParams.postID).then(function (response) {
          _this.singlePost = response.data;
          console.log(_this.singlePost);
        });
      }
    }]);

    return ShowPostComponent;
  }();

  angular.module('docExtrapolationApp').component('showpost', {
    templateUrl: 'app/posts/showpost/showpost.html',
    controller: ShowPostComponent
  });
})();
//# sourceMappingURL=showpost.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/posts/:postID', {
    template: '<showpost></showpost>'
  });
});
//# sourceMappingURL=showpost.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var UsersComponent = function () {
    function UsersComponent($http) {
      _classCallCheck(this, UsersComponent);

      this.message = 'Hello';
      this.$http = $http;
      this.allUsers = [];
    }

    _createClass(UsersComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/users').then(function (response) {
          _this.allUsers = response.data;
          console.log(_this.allUsers);
        });
      }
    }]);

    return UsersComponent;
  }();

  angular.module('docExtrapolationApp').component('users', {
    templateUrl: 'app/users/users.html',
    controller: UsersComponent
  });
})();
//# sourceMappingURL=users.controller.js.map

'use strict';

angular.module('docExtrapolationApp').config(function ($routeProvider) {
  $routeProvider.when('/users', {
    template: '<users></users>'
  });
});
//# sourceMappingURL=users.js.map

'use strict';

(function () {

  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.get();
    }

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */

      login: function login(_ref, callback) {
        var email = _ref.email;
        var password = _ref.password;

        return $http.post('/auth/local', {
          email: email,
          password: password
        }).then(function (res) {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        }).then(function (user) {
          safeCb(callback)(null, user);
          return user;
        }).catch(function (err) {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },


      /**
       * Delete access token and user info
       */
      logout: function logout() {
        $cookies.remove('token');
        currentUser = {};
      },


      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function createUser(user, callback) {
        return User.save(user, function (data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        }, function (err) {
          Auth.logout();
          return safeCb(callback)(err);
        }).$promise;
      },


      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },


      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
        return $q.when(value).then(function (user) {
          safeCb(callback)(user);
          return user;
        }, function () {
          safeCb(callback)({});
          return {};
        });
      },


      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var is = user.hasOwnProperty('role');
          safeCb(callback)(is);
          return is;
        });
      },


      /**
       * Check if a user has a specified role or higher
       *   (synchronous|asynchronous)
       *
       * @param  {String}     role     - the role to check against
       * @param  {Function|*} callback - optional, function(has)
       * @return {Bool|Promise}
       */
      hasRole: function hasRole(role, callback) {
        var hasRole = function hasRole(r, h) {
          return userRoles.indexOf(r) >= userRoles.indexOf(h);
        };

        if (arguments.length < 2) {
          return hasRole(currentUser.role, role);
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var has = user.hasOwnProperty('role') ? hasRole(user.role, role) : false;
          safeCb(callback)(has);
          return has;
        });
      },


      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function isAdmin() {
        return Auth.hasRole.apply(Auth, [].concat.apply(['admin'], arguments));
      },


      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function getToken() {
        return $cookies.get('token');
      }
    };

    return Auth;
  }

  angular.module('docExtrapolationApp.auth').factory('Auth', AuthService);
})();
//# sourceMappingURL=auth.service.js.map

'use strict';

(function () {

  function authInterceptor($rootScope, $q, $cookies, $location, Util) {
    return {
      // Add authorization token to headers

      request: function request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },


      // Intercept 401s and redirect you to login
      responseError: function responseError(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('docExtrapolationApp.auth').factory('authInterceptor', authInterceptor);
})();
//# sourceMappingURL=interceptor.service.js.map

'use strict';

(function () {

  angular.module('docExtrapolationApp.auth').run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      if (typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(function (has) {
          if (has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(function (is) {
            $location.path(is ? '/' : '/login');
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(function (is) {
          if (is) {
            return;
          }

          event.preventDefault();
          $location.path('/');
        });
      }
    });
  });
})();
//# sourceMappingURL=router.decorator.js.map

'use strict';

(function () {

  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('docExtrapolationApp.auth').factory('User', UserResource);
})();
//# sourceMappingURL=user.service.js.map

'use strict';

angular.module('docExtrapolationApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map

'use strict';

angular.module('docExtrapolationApp').factory('Modal', function ($rootScope, $uibModal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal() {
    var scope = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var modalClass = arguments.length <= 1 || arguments[1] === undefined ? 'modal-default' : arguments[1];

    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      templateUrl: 'components/modal/modal.html',
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */

      delete: function _delete() {
        var del = arguments.length <= 0 || arguments[0] === undefined ? angular.noop : arguments[0];

        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function click(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function click(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function (event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
});
//# sourceMappingURL=modal.service.js.map

'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('docExtrapolationApp').directive('mongooseError', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      element.on('keydown', function () {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  };
});
//# sourceMappingURL=mongoose-error.directive.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController = function () {
  //end-non-standard

  //start-non-standard

  function NavbarController($location, Auth) {
    _classCallCheck(this, NavbarController);

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  _createClass(NavbarController, [{
    key: 'isActive',
    value: function isActive(route) {
      return route === this.$location.path();
    }
  }]);

  return NavbarController;
}();

angular.module('docExtrapolationApp').controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map

'use strict';

angular.module('docExtrapolationApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
});
//# sourceMappingURL=navbar.directive.js.map

'use strict';

angular.module('docExtrapolationApp').controller('OauthButtonsCtrl', function ($window) {
  this.loginOauth = function (provider) {
    $window.location.href = '/auth/' + provider;
  };
});
//# sourceMappingURL=oauth-buttons.controller.js.map

'use strict';

angular.module('docExtrapolationApp').directive('oauthButtons', function () {
  return {
    templateUrl: 'components/oauth-buttons/oauth-buttons.html',
    restrict: 'EA',
    controller: 'OauthButtonsCtrl',
    controllerAs: 'OauthButtons',
    scope: {
      classes: '@'
    }
  };
});
//# sourceMappingURL=oauth-buttons.directive.js.map

'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */

      safeCb: function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },


      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: function urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },


      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: function isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          var hostnameCheck = url.hostname === o.hostname;
          var protocolCheck = url.protocol === o.protocol;
          // 2nd part of the special treatment for IE fix (see above):
          // This part is when using well-known ports 80 or 443 with IE,
          // when $window.location.port==='' instead of the real port number.
          // Probably the same cause as this IE bug: https://goo.gl/J9hRta
          var portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port === '443');
          return hostnameCheck && protocolCheck && portCheck;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('docExtrapolationApp.util').factory('Util', UtilService);
})();
//# sourceMappingURL=util.service.js.map

angular.module("docExtrapolationApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/admin/admin.html","<div class=\"container\">\n  <p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p>\n  <ul class=\"list-group user-list\">\n    <li class=\"list-group-item\" ng-repeat=\"user in admin.users\">\n	    <div class=\"user-info\">\n	        <strong>{{user.name}}</strong><br>\n	        <span class=\"text-muted\">{{user.email}}</span>\n	    </div>\n        <a ng-click=\"admin.delete(user)\" class=\"trash\"><span class=\"fa fa-trash fa-2x\"></span></a>\n    </li>\n  </ul>\n</div>\n");
$templateCache.put("app/main/main.html","<header class=\"hero-unit1\" id=\"banner\">\n  <div class=\"container col-lg-12 centerText\">\n    <h1 class=\"textShadow\">Documentation Extrapolation</h1>\n    <p class=\"lead textShadow\">Share how you decoded terrible tech docs!</p>\n    <!-- <img src=\"assets/images/DocExtrapIcon6-0269e1837c.jpg\" alt=\"Doc Extrapolation Icon\"> -->\n  </div>\n</header>\n\n<div id=\"middleBanner\">\n  <div class=\"row\">\n    <div class=\"col-lg-12 text-center topMargin\">\n      <h1>Features</h1>\n    </div>\n    <div class=\'col-md-12 text-center\'>\n      <section class=\'row topMargin\'>\n        <div class=\'col-md-4\'>\n          <img src=\"../../assets/images/Lightbulb-fd865ccf70.jpg\"/>\n          <p class=\'lead\'>Show your process.</p>\n        </div>\n        <div class=\'col-md-4\'>\n          <img src=\"../../assets/images/GroupIcon-22b97d494e.jpg\"/>\n          <p class=\'lead\'>Share your knowledge.</p>\n        </div>\n        <div class=\'col-md-4 iconMargin\'>\n          <img src=\"../../assets/images/FloppyDisk-c56bcbca57.jpg\"/>\n          <p class=\'lead\'>Save your solutions.</p>\n        </div>\n      </section>\n    </div>\n\n  </div>\n</div>\n\n<div class=\"hero-unit2\" id=\"bottomBanner\">\n  <div class=\"container\">\n    <h1>The Goal</h1>\n    <p class=\"lead\">Simplify the process of explaining how you decoded not-so-great documentation.</p>\n  <p class=\"lead\">\n    Upload screenshots, and comment on them!</p> \n    <a type=\"button\"\n       class=\"btn btn-success adjContent\"\n       href=\"/signup\">\n       Get Started Now!\n    </a>\n  </div>\n</div>\n");
$templateCache.put("app/posts/posts.html","<div class=\'container\'>\n  <div class=\'row\'>\n    <section class=\'col-md-10 col-md-offset-1 adjContent\'>\n      <div class=\'col-xs-3\'>\n        <label>Sort by...</label>\n        <select class=\'form-control\'\n                ng-model=\'$ctrl.sortBy\'>\n        <option value=\'\'\n                selected disabled>\n                Please select an option</option>\n        <option value=\'title\'>Title</option>\n        <option value=\'author\'>Author</option>\n        <option value=\'created_at\'>\n                Date Published - Earliest</option>\n        <option value=\'-created_at\'>\n                Date Published - Latest</option>\n      </select>\n    </div>\n    <div class=\"form-group col-xs-2 col-md-2\">\n      <label class=\'control-label\'>Search by Name</label>\n      <input type=\'text\'\n             ng-model=\'searchBox\'\n             class=\'form-control\'/>\n    </div>\n    </section>\n\n  </div>\n</div>\n\n\n<div class=\'container\'>\n  <div class=\'row\'>\n    <section ng-repeat=\"post in $ctrl.allPosts | orderBy: $ctrl.sortBy | filter: searchBox\"\n             class=\'col-md-10 col-md-offset-1 well adjContent\'>\n\n      <img class=\'col-md-3 resize\'\n           ng-src=\'{{ post.image_1 }}\'\n           />\n\n      <div class=\"col-md-4 adjContent\">\n        <h4>\n          <a href=\'/posts/{{ post._id }}\'>\n            {{ post.title }}\n          </a>\n        </h4>\n        <p>\n          Created By: {{ post.author }}\n        </p>\n        <p>\n          Created On: {{ post.created_at | date:\'short\' }}\n        </p>\n      </div>\n\n        <p class=\'col-md-4 adjContent\'>\n           <u>Intro</u>\n        </p>\n        <p class=\'col-md-4\'>\n           {{ post.synopsis }}\n        </p>\n  </div>\n</div>\n");
$templateCache.put("app/users/users.html","<div>This is the ALL users view.</div>\n\n<h4> Does this work? </h4>\n<div class=\'container\'>\n      <div class=\'row\'>\n        <section ng-repeat=\"user in $ctrl.allUsers\"\n                 class=\'col-md-10 col-md-offset-1 well adjContent\'>\n\n          <!-- <img class=\'col-md-3 resize\'\n               ng-src=\'{{ user.image_1 }}\'\n               /> -->\n            <h4 class=\'col-md-4 adjContent\'>\n              <a href=\'/users/{{ user._id }}\'>\n                {{ user.name }}\n              </a>\n            </h4>\n            <p class=\'col-md-4 adjContent\'>\n               {{ user.posts }}\n            </p>\n            <p class=\'col-md-4 adjContent\'>\n               {{ user.email }}\n            </p>\n\n</div>\n");
$templateCache.put("components/modal/modal.html","<div class=\"modal-header\">\n  <button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button>\n  <h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4>\n</div>\n<div class=\"modal-body\">\n  <p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p>\n  <div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div>\n</div>\n<div class=\"modal-footer\">\n  <button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button>\n</div>\n");
$templateCache.put("components/navbar/navbar.html","<div class=\"navbar navbar-default navbar-static-top\"\n     ng-controller=\"NavbarController\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button class=\"navbar-toggle\"\n              type=\"button\"\n              ng-click=\"nav.isCollapsed = !nav.isCollapsed\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"/\"\n         class=\"navbar-brand icon\">\n         <!-- doc-extrapolation -->\n      </a>\n    </div>\n    <div uib-collapse=\"nav.isCollapsed\"\n         class=\"navbar-collapse collapse\"\n         id=\"navbar-main\">\n      <ul class=\"nav navbar-nav\">\n        <li ng-repeat=\"item in nav.menu\"\n            ng-class=\"{active: nav.isActive(item.link)}\">\n            <a ng-href=\"{{item.link}}\">{{item.title}}</a>\n        </li>\n        <li ng-show=\"nav.isAdmin()\"\n            ng-class=\"{active: nav.isActive(\'/admin\')}\"><a href=\"/admin\">Admin</a></li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li ng-class=\"{active: nav.isActive(\'/posts\')}\">\n          <a href=\"/posts\">Extrapolations</a>\n        </li>\n        <li ng-show=\"nav.isLoggedIn()\"\n            ng-class=\"{active: nav.isActive(\'/posts/create\')}\"><a href=\"/posts/create\">Extrapolate</a>\n        </li>\n        <li ng-show=\"nav.isLoggedIn()\"\n            ng-class=\"{active: nav.isActive(\'/posts/author/{{ nav.getCurrentUser().name }}\')}\"><a href=\"/posts/author/{{ nav.getCurrentUser().name }}\">My Posts</a>\n        </li>\n        <!-- <li ng-show=\"nav.isLoggedIn()\"\n            ng-class=\"{active: nav.isActive(\'/users\')}\"><a href=\"/users\">Users</a>\n        </li> -->\n        <li ng-hide=\"nav.isLoggedIn()\"\n            ng-class=\"{active: nav.isActive(\'/signup\')}\"><a href=\"/signup\">Sign up</a>\n        </li>\n        <li ng-hide=\"nav.isLoggedIn()\"\n            ng-class=\"{active: nav.isActive(\'/login\')}\"><a href=\"/login\">Login</a>\n        </li>\n        <li ng-show=\"nav.isLoggedIn()\">\n          <p class=\"navbar-text\">Hello {{ nav.getCurrentUser().name }}</p>\n        </li>\n        <li ng-show=\"nav.isLoggedIn()\"\n            ng-class=\"{active: nav.isActive(\'/settings\')}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a>\n        </li>\n        <li ng-show=\"nav.isLoggedIn()\">\n          <a href=\"/logout\">Logout</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("components/oauth-buttons/oauth-buttons.html","<a ng-class=\"classes\" ng-click=\"OauthButtons.loginOauth(\'google\')\" class=\"btn btn-social btn-google\">\n  <i class=\"fa fa-google-plus\"></i>\n  Connect with Google+\n</a>\n\n");
$templateCache.put("components/footer/footer.html","<div class=\"container\">\n  <p>Lovingly Made by Jenni Bradstreet |\n    <a href=\"https://github.com/jbradstreet/doc-extrapolation\">GitHub</a> \n  </p>\n</div>\n");
$templateCache.put("app/account/login/login.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <h1>Login</h1>\n      <!-- <p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@example.com</code> / <code>test</code></p>\n      <p>Admin account is <code>admin@example.com</code> / <code>admin</code></p> -->\n    </div>\n    <div class=\"col-sm-4\">\n      <form class=\"form\" name=\"form\" ng-submit=\"vm.login(form)\" novalidate>\n\n        <div class=\"form-group\">\n          <label>Email</label>\n\n          <input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"vm.user.email\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label>Password</label>\n\n          <input type=\"password\" name=\"password\" class=\"form-control\" ng-model=\"vm.user.password\" required>\n        </div>\n\n        <div class=\"form-group has-error\">\n          <p class=\"help-block\" ng-show=\"form.email.$error.required && form.password.$error.required && vm.submitted\">\n             Please enter your email and password.\n          </p>\n          <p class=\"help-block\" ng-show=\"form.email.$error.email && vm.submitted\">\n             Please enter a valid email.\n          </p>\n\n          <p class=\"help-block\">{{ vm.errors.other }}</p>\n        </div>\n\n        <div>\n          <button class=\"btn btn-inverse btn-lg btn-login\" type=\"submit\">\n            Login\n          </button>\n          <a class=\"btn btn-default btn-lg btn-register\" href=\"/signup\">\n            Register\n          </a><br /><br />\n        </div>\n    </div>\n        <hr/>\n      <div class=\"col-md-12\">\n        <div class=\"row\">\n          <div class=\"col-sm-4 col-md-3\">\n            <oauth-buttons classes=\"btn-block\"></oauth-buttons>\n          </div>\n        </div>\n      </div>\n      </form>\n\n  </div>\n  <hr>\n</div>\n");
$templateCache.put("app/account/settings/settings.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <h1>Change Password</h1>\n    </div>\n    <div class=\"col-sm-12\">\n      <form class=\"form\" name=\"form\" ng-submit=\"vm.changePassword(form)\" novalidate>\n\n        <div class=\"form-group\">\n          <label>Current Password</label>\n\n          <input type=\"password\" name=\"password\" class=\"form-control\" ng-model=\"vm.user.oldPassword\"\n                 mongoose-error/>\n          <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n              {{ vm.errors.other }}\n          </p>\n        </div>\n\n        <div class=\"form-group\">\n          <label>New Password</label>\n\n          <input type=\"password\" name=\"newPassword\" class=\"form-control\" ng-model=\"vm.user.newPassword\"\n                 ng-minlength=\"3\"\n                 required/>\n          <p class=\"help-block\"\n             ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)\">\n            Password must be at least 3 characters.\n          </p>\n        </div>\n\n        <div class=\"form-group\">\n          <label>Confirm New Password</label>\n\n          <input type=\"password\" name=\"confirmPassword\" class=\"form-control\" ng-model=\"vm.user.confirmPassword\"\n                 match=\"vm.user.newPassword\"\n                 ng-minlength=\"3\"\n                 required=\"\"/>\n          <p class=\"help-block\"\n             ng-show=\"form.confirmPassword.$error.match && vm.submitted\">\n            Passwords must match.\n          </p>\n\n        </div>\n\n        <p class=\"help-block\"> {{ vm.message }} </p>\n\n        <button class=\"btn btn-lg btn-primary\" type=\"submit\">Save changes</button>\n      </form>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/account/signup/signup.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <h1>Sign up</h1>\n    </div>\n    <div class=\"col-sm-12\">\n      <form class=\"form\" name=\"form\" ng-submit=\"vm.register(form)\" novalidate>\n\n        <div class=\"form-group\" ng-class=\"{ \'has-success\': form.name.$valid && vm.submitted,\n                                            \'has-error\': form.name.$invalid && vm.submitted }\">\n          <label>Name</label>\n\n          <input type=\"text\" name=\"name\" class=\"form-control\" ng-model=\"vm.user.name\"\n                 required/>\n          <p class=\"help-block\" ng-show=\"form.name.$error.required && vm.submitted\">\n            A name is required\n          </p>\n        </div>\n\n        <div class=\"form-group\" ng-class=\"{ \'has-success\': form.email.$valid && vm.submitted,\n                                            \'has-error\': form.email.$invalid && vm.submitted }\">\n          <label>Email</label>\n\n          <input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"vm.user.email\"\n                 required\n                 mongoose-error/>\n          <p class=\"help-block\" ng-show=\"form.email.$error.email && vm.submitted\">\n            Doesn\'t look like a valid email.\n          </p>\n          <p class=\"help-block\" ng-show=\"form.email.$error.required && vm.submitted\">\n            What\'s your email address?\n          </p>\n          <p class=\"help-block\" ng-show=\"form.email.$error.mongoose\">\n            {{ vm.errors.email }}\n          </p>\n        </div>\n\n        <div class=\"form-group\" ng-class=\"{ \'has-success\': form.password.$valid && vm.submitted,\n                                            \'has-error\': form.password.$invalid && vm.submitted }\">\n          <label>Password</label>\n\n          <input type=\"password\" name=\"password\" class=\"form-control\" ng-model=\"vm.user.password\"\n                 ng-minlength=\"3\"\n                 required\n                 mongoose-error/>\n          <p class=\"help-block\"\n             ng-show=\"(form.password.$error.minlength || form.password.$error.required) && vm.submitted\">\n            Password must be at least 3 characters.\n          </p>\n          <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n            {{ vm.errors.password }}\n          </p>\n        </div>\n\n        <div class=\"form-group\" ng-class=\"{ \'has-success\': form.confirmPassword.$valid && vm.submitted,\n                                            \'has-error\': form.confirmPassword.$invalid && vm.submitted }\">\n          <label>Confirm Password</label>\n          <input type=\"password\" name=\"confirmPassword\" class=\"form-control\" ng-model=\"vm.user.confirmPassword\"\n                 match=\"vm.user.password\"\n                 ng-minlength=\"3\" required/>\n          <p class=\"help-block\"\n             ng-show=\"form.confirmPassword.$error.match && vm.submitted\">\n            Passwords must match.\n          </p>\n        </div>\n\n        <div>\n          <button class=\"btn btn-inverse btn-lg btn-register\" type=\"submit\">\n            Sign up\n          </button>\n          <a class=\"btn btn-default btn-lg btn-login\" href=\"/login\">\n            Login\n          </a>\n        </div>\n\n        <hr/>\n        <div class=\"row\">\n          <div class=\"col-sm-4 col-md-3\">\n            <oauth-buttons classes=\"btn-block\"></oauth-buttons>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <hr>\n</div>\n");
$templateCache.put("app/posts/author/author.html","<div class=\'container\'>\n  <div class=\'row\'>\n    <section class=\'col-md-10 col-md-offset-1 adjContent\'>\n      <div class=\'col-xs-3\'>\n        <label>Sort by...</label>\n        <select class=\'form-control\'\n                ng-model=\'$ctrl.sortBy\'>\n        <option value=\'\'\n                selected disabled>\n                Please select an option</option>\n        <option value=\'title\'>Title</option>\n        <option value=\'created_at\'>\n                Date Published - Earliest</option>\n        <option value=\'-created_at\'>\n                Date Published - Latest</option>\n      </select>\n      </div>\n      <div class=\"form-group col-xs-2 col-md-2\">\n        <label class=\'control-label\'>Search Box!</label>\n        <input type=\'text\'\n               ng-model=\'searchBox\'\n               class=\'form-control\'/>\n      </div>\n    </section>\n  </div>\n</div>\n\n<div class=\'container\'>\n  <div class=\'row\'>\n    <section ng-repeat=\"post in $ctrl.authorPosts | orderBy: $ctrl.sortBy | filter: searchBox\"\n             class=\'col-md-10 col-md-offset-1 well adjContent\'>\n      <img class=\'col-md-3 resize\'\n           ng-src=\'{{ post.image_1 }}\'/>\n\n      <div class=\'col-md-4 adjContent\'>\n        <h4>\n          <a href=\'/posts/{{ post._id }}\'>\n            {{ post.title }}\n          </a>\n        </h4>\n        <p>\n          Created By: {{ post.author }}\n        </p>\n        <p>\n          Created On: {{ post.created_at | date:\'short\' }}\n        </p>\n      </div>\n\n      <p class=\'col-md-4 adjContent\'>\n         <u>Intro</u>\n      </p>\n      <p class=\'col-md-4\'>\n         {{ post.synopsis }}\n      </p>\n\n\n      <a type=\"button\"\n         class=\"btn btn-warning adjContent\"\n         href=\"/posts/{{ post._id }}/edit\">\n         Edit\n      </a>\n    </div>\n</div>\n");
$templateCache.put("app/posts/create/create.html","<div class=\"container\">\n  <div class=\"row\">\n    <form name=\"post_form\"\n    novalidate >\n      <fieldset class=\"form-group\">\n        <label name=\"title\">Give your post a title!</label><br />\n        <input type=\"text\"\n               placeholder=\"Title goes here.\"\n               name=\"title\"\n               ng-model=\'$ctrl.post.title\' /><br /><br />\n        <label name=\"introduce\">Introduce the doc that you didn\'t like.</label>\n        <textarea type=\"text\"\n                  name=\"synopsis\"\n                  class=\"form-control\"\n                  rows=\"5\"\n                  placeholder=\"A SHORT synopsis. Please.\"\n                  ng-model=\'$ctrl.post.synopsis\'/><br /><br />\n\n        <!-- first img and caption pair -->\n        <label name=\"image\">Upload ALL your screenshots!</label><br />\n\n       <!-- filestack  -->\n       <div>\n          <script type=\"text/javascript\"\n                  src=\"//api.filestackapi.com/filestack.js\"></script>\n          <input type=\"filepicker\"\n                 data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\"\n                 onchange=\"filePicked(event)\"\n                 data-fp-mimetypes=\"*/*\"\n                 data-fp-container=\"modal\"\n                 >\n       </div><br /><br />\n\n       <div class=\"row center-block\">\n         <img class=\'col-md-8\'\n              ng-show=\"$ctrl.imageURL1\"\n              ng-src=\"{{ $ctrl.imageURL1 }}\"\n              alt=\"preview of uploaded image\" />\n       </div><br /><br />\n      <!-- end of filestack -->\n\n        <label name=\"caption\">Write caption for screenshot/image.</label>\n        <textarea type=\"text\"\n                  name=\"caption_1\"\n                  class=\"form-control\"\n                  rows=\"3\"\n                  placeholder=\"A SHORT caption.\"\n                  ng-model=\'$ctrl.post.caption_1\'/><br /><br />\n\n        <!-- end of first img and caption pair -->\n\n        <!-- second img and caption pair -->\n        <div ng-hide=\"$ctrl.hiddenfields\">\n          <label name=\"image\">Upload your screenshot!</label><br />\n\n          <div>\n             <input type=\"filepicker\"\n                    data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\" onchange=\"filePickedTwo(event)\"\n                    data-fp-mimetypes=\"*/*\"\n                    data-fp-container=\"modal\" >\n          </div><br /><br />\n\n          <div class=\"row center-block\">\n            <img class=\'col-md-8\'\n                 ng-show=\"$ctrl.imageURL2\"\n                 ng-src=\"{{ $ctrl.imageURL2 }}\"\n                 alt=\"preview of uploaded image\" />\n          </div><br /><br />\n\n        <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_2\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.post.caption_2\'/><br /><br />\n        </div>\n        <!-- end of second img and caption pair -->\n\n        <!-- third img and caption pair -->\n        <div ng-hide=\"$ctrl.hiddenfields\">\n          <label name=\"image\">Upload your screenshot!</label><br />\n\n          <div>\n            <input type=\"filepicker\"\n                   data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\" onchange=\"filePickedThree(event)\"\n                   data-fp-mimetypes=\"*/*\"\n                   data-fp-container=\"modal\" >\n          </div><br /><br />\n           <div class=\"row center-block\">\n             <img class=\'col-md-8\'\n                  ng-show=\"$ctrl.imageURL3\"\n                  ng-src=\"{{ $ctrl.imageURL3 }}\"\n                  alt=\"preview of uploaded image\" />\n           </div><br /><br />\n\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_3\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.post.caption_3\'/><br /><br />\n        </div>\n        <!-- end of third img and caption pair -->\n\n        <!-- fourth img and caption pair -->\n        <div ng-hide=\"$ctrl.hiddenfields\">\n          <label name=\"image\">Upload your screenshot!</label><br />\n\n          <div>\n            <input type=\"filepicker\"\n                   data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\" onchange=\"filePickedFour(event)\"\n                   data-fp-mimetypes=\"*/*\"\n                   data-fp-container=\"modal\" >\n          </div><br /><br />\n           <div class=\"row center-block\">\n             <img class=\'col-md-8\'\n                  ng-show=\"$ctrl.imageURL4\"\n                  ng-src=\"{{ $ctrl.imageURL4 }}\"\n                  alt=\"preview of uploaded image\" />\n           </div><br /><br />\n\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_4\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.post.caption_4\'/><br /><br />\n        </div>\n        <!-- end of fourth img and caption pair -->\n\n        <!-- fifth img and caption pair -->\n        <div ng-hide=\"$ctrl.hiddenfields\">\n          <label name=\"image\">Upload your screenshot!</label><br />\n\n          <div>\n            <input type=\"filepicker\"\n                   data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\" onchange=\"filePickedFive(event)\"\n                   data-fp-mimetypes=\"*/*\"\n                   data-fp-container=\"modal\" >\n          </div><br /><br />\n           <div class=\"row center-block\">\n             <img class=\'col-md-8\'\n                  ng-show=\"$ctrl.imageURL5\"\n                  ng-src=\"{{ $ctrl.imageURL5 }}\"\n                  alt=\"preview of uploaded image\" />\n           </div><br /><br />\n\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_5\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.post.caption_5\'/><br /><br />\n        </div>\n        <!-- end of fifth img and caption pair -->\n\n        <button type=\"submit\"\n                class=\"btn btn-primary adjTopMargin\"\n                ng-click=\"$ctrl.reveal()\"\n                >\n                Give Me More Fields\n        </button><br /><br />\n\n      </fieldset>\n      <button type=\"submit\"\n              class=\"btn btn-success adjTopMargin\"\n              ng-click=\"$ctrl.submit()\"\n              ng-href=\"/posts\">\n              Submit\n      </button>\n    </form>\n  </div>\n</div>\n");
$templateCache.put("app/posts/edit/edit.html","<h2>This is the Edit Post page!</h2>\n\n{{ $ctrl.message }}\n\n<div class=\"container\">\n  <div class=\"row\">\n    <form name=\"post_form\"\n    novalidate >\n      <fieldset class=\"form-group\">\n        <label name=\"title\">Give your post a title!</label><br />\n        <input type=\"text\"\n               placeholder=\"Title goes here.\"\n               name=\"title\"\n               ng-model=\'$ctrl.singlePost.title\' /><br /><br />\n        <label name=\"introduce\">Introduce the doc that you didn\'t like.</label>\n        <textarea type=\"text\"\n                  name=\"synopsis\"\n                  class=\"form-control\"\n                  rows=\"5\"\n                  placeholder=\"A SHORT synopsis. Please.\"\n                  ng-model=\'$ctrl.singlePost.synopsis\'/><br /><br />\n\n        <!-- first img and caption pair -->\n        <label name=\"image\">URL of current screenshot! Clear if you want to delete it.</label><br />\n        <input type=\"url\"\n               placeholder= \"Use url for now.\"\n               name=\"image_1\"\n               ng-model=\'$ctrl.singlePost.image_1\' /><br /><br />\n        <div>\n          <script type=\"text/javascript\"\n                  src=\"//api.filestackapi.com/filestack.js\"></script>\n          <label name=\"image\">Click this to choose a new image.</label><br />\n          <input type=\"filepicker\"\n                 data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\"\n                 onchange=\"filePicked(event)\"\n                 data-fp-mimetypes=\"*/*\"\n                 data-fp-container=\"modal\" />\n        </div><br /><br />\n        <div class=\"row center-block\">\n          <img class=\'col-md-8\'\n               ng-show=\"$ctrl.imageURL1\"\n               ng-src=\"{{ $ctrl.imageURL1 }}\"\n               alt=\"preview of uploaded image\" />\n        </div><br /><br />\n        <label name=\"caption\">Write caption for screenshot/image.</label>\n        <textarea type=\"text\"\n                  name=\"caption_1\"\n                  class=\"form-control\"\n                  rows=\"3\"\n                  placeholder=\"A SHORT caption.\"\n                  ng-model=\'$ctrl.singlePost.caption_1\'/><br /><br />\n        <!-- end of first img and caption pair -->\n\n        <!-- second img and caption pair -->\n        <div>\n          <label name=\"image\">URL of current screenshot! Clear if you want to delete it.</label><br />\n          <input type=\"url\"\n                 placeholder= \"Use url for now.\"\n                 name=\"image_2\"\n                 ng-model=\'$ctrl.singlePost.image_2\' /><br /><br />\n          <div>\n            <label name=\"image\">Click this to choose a new image.</label><br />\n            <input type=\"filepicker\"\n                   data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\"\n                   onchange=\"filePickedTwo(event)\"\n                   data-fp-mimetypes=\"*/*\"\n                   data-fp-container=\"modal\" />\n          </div><br /><br />\n           <div class=\"row center-block\">\n             <img class=\'col-md-8\'\n                  ng-show=\"$ctrl.imageURL2\"\n                  ng-src=\"{{ $ctrl.imageURL2 }}\"\n                  alt=\"preview of uploaded image\" />\n           </div><br /><br />\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_2\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.singlePost.caption_2\'/><br /><br />\n        </div>\n        <!-- end of second img and caption pair -->\n\n        <!-- removed ng-hide, for now. Makes entire field go away during editing process! -->\n        <!-- third img and caption pair -->\n        <div>\n          <label name=\"image\">URL of current screenshot! Clear if you want to delete it.</label><br />\n          <input type=\"url\"\n                 placeholder= \"Use url for now.\"\n                 name=\"image_3\"\n                 ng-model=\'$ctrl.singlePost.image_3\' /><br /><br />\n          <div>\n            <label name=\"image\">Click this to choose a new image.</label><br />\n            <input type=\"filepicker\"\n                  data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\"\n                  onchange=\"filePickedThree(event)\"\n                  data-fp-mimetypes=\"*/*\"\n                  data-fp-container=\"modal\" />\n          </div><br /><br />\n          <div class=\"row center-block\">\n            <img class=\'col-md-8\'\n                 ng-show=\"$ctrl.imageURL3\"\n                 ng-src=\"{{ $ctrl.imageURL3 }}\"\n                 alt=\"preview of uploaded image\" />\n          </div><br /><br />\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_3\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.singlePost.caption_3\'/><br /><br />\n        </div>\n        <!-- end of third img and caption pair -->\n\n        <!-- fourth img and caption pair -->\n        <div>\n          <label name=\"image\">URL of current screenshot! Clear if you want to delete it.</label><br />\n          <input type=\"url\"\n                 placeholder= \"Use url for now.\"\n                 name=\"image_4\"\n                 ng-model=\'$ctrl.singlePost.image_4\' /><br /><br />\n          <div>\n            <label name=\"image\">Click this to choose a new image.</label><br />\n            <input type=\"filepicker\"\n                  data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\"\n                  onchange=\"filePickedFour(event)\"\n                  data-fp-mimetypes=\"*/*\"\n                  data-fp-container=\"modal\" />\n          </div><br /><br />\n          <div class=\"row center-block\">\n            <img class=\'col-md-8\'\n                 ng-show=\"$ctrl.imageURL4\"\n                 ng-src=\"{{ $ctrl.imageURL4 }}\"\n                 alt=\"preview of uploaded image\" />\n          </div><br /><br />\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_4\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.singlePost.caption_4\'/><br /><br />\n        </div>\n        <!-- end of fourth img and caption pair -->\n\n        <!-- fifth img and caption pair -->\n        <div>\n          <label name=\"image\">URL of current screenshot! Clear if you want to delete it.</label><br />\n          <input type=\"url\"\n                 placeholder= \"Use url for now.\"\n                 name=\"image_5\"\n                 ng-model=\'$ctrl.singlePost.image_5\' /><br /><br />\n          <div>\n            <label name=\"image\">Click this to choose a new image.</label><br />\n            <input type=\"filepicker\"\n                  data-fp-apikey=\"Ag1dCd9vNR966DYsKdIdAz\"\n                  onchange=\"filePickedFive(event)\"\n                  data-fp-mimetypes=\"*/*\"\n                  data-fp-container=\"modal\" />\n          </div><br /><br />\n          <div class=\"row center-block\">\n            <img class=\'col-md-8\'\n                 ng-show=\"$ctrl.imageURL5\"\n                 ng-src=\"{{ $ctrl.imageURL5 }}\"\n                 alt=\"preview of uploaded image\" />\n          </div><br /><br />\n          <label name=\"caption\">Write caption for screenshot/image.</label>\n          <textarea type=\"text\"\n                    name=\"caption_5\"\n                    class=\"form-control\"\n                    rows=\"3\"\n                    placeholder=\"A SHORT caption.\"\n                    ng-model=\'$ctrl.singlePost.caption_5\'/><br /><br />\n        </div>\n        <!-- end of fifth img and caption pair -->\n      </fieldset>\n      <!-- <button type=\"submit\"\n              class=\"btn btn-primary adjTopMargin\"\n              ng-click=\"$ctrl.reveal()\"\n              >\n              Give Me More Fields\n      </button> -->\n      <a type=\"button\"\n         class=\"btn btn-success adjTopMargin\"\n         ng-click=\"$ctrl.update()\"\n         ng-href=\"/posts\">\n         Update\n      </a>\n      <a type=\"button\"\n         class=\"btn btn-danger adjTopMargin\"\n         ng-click=\"$ctrl.delete()\"\n         href=\"/posts/author/{{ $ctrl.getCurrentUser().name}}\">\n         Delete\n      </a>\n    </form>\n  </div>\n</div>\n");
$templateCache.put("app/posts/showpost/showpost.html","\n<div class=\'container\'>\n  <div class=\'row\'>\n    <section class=\'col-md-10 col-md-offset-1 well\'>\n\n      <div class=\"row\">\n        <h2 class=\'col-md-12\'>\n          {{ $ctrl.singlePost.title }}\n        </h2>\n      </div>\n      <div class=\"row\">\n        <p class=\'lead col-md-4\'>\n          By: {{ $ctrl.singlePost.author }}\n        </p>\n      </div>\n\n      <div class= \"row\">\n        <p class=\'col-md-12\'>\n          {{ $ctrl.singlePost.synopsis }}\n        </p>\n      </div><br />\n\n      <div class=\"row\">\n        <img class=\'col-md-8 col-md-offset-2 img-responsive\'\n             ng-src=\'{{ $ctrl.singlePost.image_1 }}\'\n        />\n      </div><br />\n\n      <div class=\"row\">\n        <p class=\'col-md-10 col-md-offset-1\'>\n          {{ $ctrl.singlePost.caption_1 }}\n        </p>\n      </div><br /><br />\n\n      <div class=\"row\">\n        <img class=\'col-md-8 col-md-offset-2 img-responsive\'\n             ng-src=\'{{ $ctrl.singlePost.image_2 }}\'\n        />\n      </div><br />\n\n      <div class=\"row\">\n        <p class=\'col-md-10 col-md-offset-1\'>\n          {{ $ctrl.singlePost.caption_2 }}\n        </p>\n      </div><br /><br />\n\n      <div class=\"row\">\n        <img class=\'col-md-8 col-md-offset-2 img-responsive\'\n             ng-src=\'{{ $ctrl.singlePost.image_3 }}\'\n        />\n      </div><br />\n\n      <div class=\"row\">\n        <p class=\'col-md-10 col-md-offset-1\'>\n          {{ $ctrl.singlePost.caption_3 }}\n        </p>\n      </div><br /><br />\n\n      <div class=\"row\">\n        <img class=\'col-md-8 col-md-offset-2 img-responsive\'\n             ng-src=\'{{ $ctrl.singlePost.image_4 }}\'\n        />\n      </div><br />\n\n      <div class=\"row\">\n        <p class=\'col-md-10 col-md-offset-1\'>\n          {{ $ctrl.singlePost.caption_4 }}\n        </p>\n      </div><br /><br />\n\n      <div class=\"row\">\n        <img class=\'col-md-8 col-md-offset-2 img-responsive\'\n             ng-src=\'{{ $ctrl.singlePost.image_5 }}\'\n        />\n      </div><br />\n\n      <div class=\"row\">\n        <p class=\'col-md-10 col-md-offset-1\'>\n          {{ $ctrl.singlePost.caption_5 }}\n        </p>\n      </div><br /><br />\n\n      <!-- <a type=\"button\"\n         class=\"btn btn-warning adjTopMargin\"\n         ng-href=\"/posts/{{ $ctrl.singlePost._id }}/edit\">\n         Edit\n      </a> -->\n    </section>\n  </div>\n</div>\n");}]);