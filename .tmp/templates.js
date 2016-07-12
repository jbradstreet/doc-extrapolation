angular.module("docExtrapolationApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/admin/admin.html","<div class=\"container\">\n  <p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p>\n  <ul class=\"list-group user-list\">\n    <li class=\"list-group-item\" ng-repeat=\"user in admin.users\">\n	    <div class=\"user-info\">\n	        <strong>{{user.name}}</strong><br>\n	        <span class=\"text-muted\">{{user.email}}</span>\n	    </div>\n        <a ng-click=\"admin.delete(user)\" class=\"trash\"><span class=\"fa fa-trash fa-2x\"></span></a>\n    </li>\n  </ul>\n</div>\n");
$templateCache.put("app/main/main.html","<header class=\"hero-unit1\" id=\"banner\">\n  <div class=\"container col-lg-12 centerText\">\n    <h1 class=\"textShadow\">Documentation Extrapolation</h1>\n    <p class=\"lead textShadow\">Share how you decoded terrible tech docs!</p>\n    <!-- <img src=\"assets/images/DocExtrapIcon6.jpg\" alt=\"Doc Extrapolation Icon\"> -->\n  </div>\n</header>\n\n<div id=\"middleBanner\">\n  <div class=\"row\">\n    <div class=\"col-lg-12 text-center topMargin\">\n      <h1>Features</h1>\n    </div>\n    <div class=\'col-md-12 text-center\'>\n      <section class=\'row topMargin\'>\n        <div class=\'col-md-4\'>\n          <img src=\"../../assets/images/Lightbulb.jpg\"/>\n          <p class=\'lead\'>Show your process.</p>\n        </div>\n        <div class=\'col-md-4\'>\n          <img src=\"../../assets/images/GroupIcon.jpg\"/>\n          <p class=\'lead\'>Share your knowledge.</p>\n        </div>\n        <div class=\'col-md-4 iconMargin\'>\n          <img src=\"../../assets/images/FloppyDisk.jpg\"/>\n          <p class=\'lead\'>Save your solutions.</p>\n        </div>\n      </section>\n    </div>\n\n  </div>\n</div>\n\n<div class=\"hero-unit2\" id=\"bottomBanner\">\n  <div class=\"container\">\n    <h1>The Goal</h1>\n    <p class=\"lead\">Simplify the process of explaining how you decoded not-so-great documentation.</p>\n  <p class=\"lead\">\n    Upload screenshots, and comment on them!</p> \n    <a type=\"button\"\n       class=\"btn btn-success adjContent\"\n       href=\"/signup\">\n       Get Started Now!\n    </a>\n  </div>\n</div>\n");
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