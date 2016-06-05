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
  var name = func.name || ('AutorunAsyncImmediate@' + getNextId());

  function reactionHandler () {
    if (!reaction.isDisposed)
      reaction.track(func);
  }

  delay = delay == null ? 1 : delay;
  if (scope)
    func = func.bind(scope);

  reaction = new Reaction(name,
    debounce(reactionHandler, delay, { leading: true }));

  reaction.schedule();
  return reaction.getDisposer();
}

////////////////////////////////////////////////////////////////////////////////
// export
////////////////////////////////////////////////////////////////////////////////

module.exports = autorunAsyncImmediate;