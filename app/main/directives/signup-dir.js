'use strict';
angular.module('main')
.directive('signup', function (Utils, Auth, $state) {
  return {
    templateUrl: 'main/templates/signup.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs, $log) {
      element.text('this is the signup directive', attrs);
      scope.register = function (user) {
        if (angular.isDefined(user)) {
          Utils.show();
          Auth.register(user)
            .then(function () {
              Utils.hide();
              $log.log('user created:' + JSON.stringify(user));
              Utils.alertshow('Successfully", "The User was Successfully Created.');
              $state.go('home');
            }, function (err) {
              Utils.hide();
              Utils.errMessage(err);
            });
        }
      };
    }
  };
});
