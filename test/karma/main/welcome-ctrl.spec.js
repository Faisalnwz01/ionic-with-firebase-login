'use strict';

describe('module: main, controller: WelcomeCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var WelcomeCtrl;
  beforeEach(inject(function ($controller) {
    WelcomeCtrl = $controller('WelcomeCtrl');
  }));

  it('should do something', function () {
    expect(!!WelcomeCtrl).toBe(true);
  });

});
