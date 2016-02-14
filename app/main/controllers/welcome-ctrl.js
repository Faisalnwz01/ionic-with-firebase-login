'use strict';
angular.module('main')
  .controller('WelcomeCtrl', function(FURL,
    $scope,
    $log,
    $ionicModal,
    Utils,
    Auth,
    $state,
    $localStorage,
    $firebaseObject) {
    var vm = this,
      loginModal, signupModal,
      ref = new Firebase(FURL),
      userkey = "";

    $log.log('Hello from your Controller: WelcomeCtrl in module main:. This is your controller:', this);
    $ionicModal.fromTemplateUrl('main/templates/login.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      loginModal = modal;
    });
    $ionicModal.fromTemplateUrl('main/templates/signup.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      signupModal = modal;
    });
    vm.openLoginModal = function() {
      loginModal.show();
    };
    vm.closeLoginModal = function() {
      loginModal.hide();
    };
    vm.openSignupModal = function() {
      signupModal.show();
    };
    vm.closeSignupModal = function() {
      signupModal.hide();
    };
    //Cleanup the modal when we're done with it!
    // vm.$on('$destroy', function () {
    //   loginModal.remove();
    // });
    // // Execute action on hide modal
    // vm.$on('modal.hidden', function () {
    //   // Execute action
    // });
    // // Execute action on remove modal
    // vm.$on('modal.removed', function () {
    //   // Execute action
    // });

    ///login function

    vm.signIn = function(user) {
      console.log("Enviado");
      if (angular.isDefined(user)) {
        Utils.show();
        Auth.login(user)
          .then(function(authData) {
            //console.log("id del usuario:" + JSON.stringify(authData));

            ref.child('profile').orderByChild("id").equalTo(authData.uid).on("child_added", function(snapshot) {
              console.log(snapshot.key());
              userkey = snapshot.key();
              var obj = $firebaseObject(ref.child('profile').child(userkey));

              obj.$loaded()
                .then(function(data) {
                  //console.log(data === obj); // true
                  //console.log(obj.email);
                  $localStorage.email = obj.email;
                  $localStorage.userkey = userkey;

                  Utils.hide();
                  $state.go('home');
                  console.log("Starter page", "Home");

                })
                .catch(function(error) {
                  console.error("Error:", error);
                });
            });

          }, function(err) {
            Utils.hide();
            Utils.errMessage(err);
          });
      }
    };
    vm.register = function(user) {
      if (angular.isDefined(user)) {
        Utils.show();
        Auth.register(user)
          .then(function() {
            Utils.hide();
            $log.log("user created:" + JSON.stringify(user));
            Utils.alertshow("Successfully", "The User was Successfully Created.");
            $state.go('home');
          }, function(err) {
            Utils.hide();
            Utils.errMessage(err);
          });
      }
    };
    vm.resetpassword = function(user) {
      if (angular.isDefined(user)) {
        Auth.resetpassword(user)
          .then(function() {
            //console.log("Password reset email sent successfully!");
            $state.go('welcome');
          }, function(err) {
            //console.error("Error: ", err);
          });
      }
    };

  });
