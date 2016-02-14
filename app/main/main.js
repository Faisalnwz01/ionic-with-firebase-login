'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'firebase',
  'ngStorage',
  'ngMessages'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/welcome');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('welcome', {
      url: '/welcome',
      // abstract: true,
      templateUrl: 'main/templates/welcome.html',
      controller: 'WelcomeCtrl as vm'
    })
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'tab-debug': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
})
.constant('FURL', 'https://anchorit.firebaseio.com/');
