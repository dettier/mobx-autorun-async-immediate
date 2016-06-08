# mobx-autorun-async-immediate [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Mobx debounced autorun function with immediate synchronous first call

## Why use this?

If you need to run some heavy action (such as data fetching from server) when your observables change, you usually want to debounce your action. But you probably need the first run of your action to be synchronous (so the first fetching starts right away).

### Why not use autorunAsync?
Mobx has autorunAsync, but it may not suit you for the following reasons:
- it provides throttled (rate limiting), not debounced behaviour
- it doesn't run your action immediately, so your initial server request will be delayed for `delay` miliseconds, which is probably not what you want, especially for server-side rendering


## Installation

```sh
$ npm install --save mobx-autorun-async-immediate
```

## Usage

```js
const autorunAsyncImmediate = require('mobx-autorun-async-immediate');
const scope = {};
const delay = 100;

const dispose = autorunAsyncImmediate(() => {
  // send request to fetch data from server
}, delay, scope);

// request is already sent here
```
## License

MIT © [dettier]()


[npm-image]: https://badge.fury.io/js/mobx-autorun-async-immediate.svg
[npm-url]: https://npmjs.org/package/mobx-autorun-async-immediate
[travis-image]: https://travis-ci.org/dettier/mobx-autorun-async-immediate.svg?branch=master
[travis-url]: https://travis-ci.org/dettier/mobx-autorun-async-immediate
[daviddm-image]: https://david-dm.org/dettier/mobx-autorun-async-immediate.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/dettier/mobx-autorun-async-immediate
[coveralls-image]: https://coveralls.io/repos/dettier/mobx-autorun-async-immediate/badge.svg
[coveralls-url]: https://coveralls.io/r/dettier/mobx-autorun-async-immediate
