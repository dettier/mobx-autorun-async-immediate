'use strict';

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : BEGIN
////////////////////////////////////////////////////////////////////////////////

var assert = require('chai').assert;
var observable = require('mobx').observable;
var autorunAsyncImmediate = require('../lib');

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : END
////////////////////////////////////////////////////////////////////////////////

describe('autorun-async-immediate', function () {

  it('should immediately invoke passed function', function () {

    var isCalled = false;
    autorunAsyncImmediate(function () {
      isCalled = true;
    }, 100);

    assert.isTrue(isCalled, 'function was not called.');
  });

  it('should have debounced behaviour', function (done) {

    var callCount = 0;
    var obs = observable(0);
    autorunAsyncImmediate(function () {
      obs.get(); // register obs dependency
      callCount++;
    }, 200);

    function increaseObs () {
      obs.set(obs.get() + 1);
    }

    // change observable value 3 times during 30ms, but the
    // handler should be invoked only once after additional 200ms
    setTimeout(increaseObs, 10);
    setTimeout(increaseObs, 20);
    setTimeout(increaseObs, 30);

    setTimeout(function () {
      try {
        assert.equal(callCount, 2, 'should call autorun handler twice');
        done();
      } catch (e) {
        done(e);
      }
    }, 1000);

  });

  it('should return dispose function', function () {
    var result = autorunAsyncImmediate(function () {}, 100);
    assert.isFunction(result);
  });

});
