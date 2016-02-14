'use strict';

describe('module: main, service: Util', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Util;
  beforeEach(inject(function (_Util_) {
    Util = _Util_;
  }));

  it('should do something', function () {
    expect(!!Util).toBe(true);
  });

});
