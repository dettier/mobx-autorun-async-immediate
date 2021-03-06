'use strict';

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : BEGIN
////////////////////////////////////////////////////////////////////////////////

var debounce = require('lodash.debounce');
var Reaction = require('mobx').Reaction;

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : END
////////////////////////////////////////////////////////////////////////////////

var i = 0;
function getNextId () {
  return ++i;
}

////////////////////////////////////////////////////////////////////////////////
// autorunAsyncImmediate
////////////////////////////////////////////////////////////////////////////////

function autorunAsyncImmediate (func, delay, scope) {
  var reaction;
  var disposer;
  var name = func.name || ('AutorunAsyncImmediate@' + getNextId());
  var debouncedHandler;

  if (scope)
    func = func.bind(scope);

  function reactionHandler () {
    if (!reaction.isDisposed)
      reaction.track(func);
  }

  debouncedHandler =
    debounce(reactionHandler, delay == null ? 1 : delay);

  reaction = new Reaction(name, debouncedHandler);
  reaction.schedule();

  // make immediate call
  debouncedHandler.flush();
  disposer = reaction.getDisposer();

  return function () {
    debouncedHandler.cancel();
    return disposer();
  };
}

////////////////////////////////////////////////////////////////////////////////
// export
////////////////////////////////////////////////////////////////////////////////

module.exports = autorunAsyncImmediate;
