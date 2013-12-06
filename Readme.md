# KVS - MemCache
[KVS](http://npmjs.org/package/kvs) or   *K*ey *V*alue *S*tore is an abstract KeyValueStore system. The *kvs-** group of node modules, are intended to present a unified interface to key value stores of every persuasion. This allows for substituting them without changing anything but the initializing parameters.
*KVS-awss3* is a KVS compliant module that uses [MemCacheD](http://www.memcached.org) as a persitance layer.  It uses [memcache](http://npmjs.org/package/memcache) to interact with the server.
## Install
    npm install kvs-memcache
## Testing
in order to test via `npm test` you have to have a MemCacheD server running at *localhost:11211*

## Use
    var KVS=require('kvs-memcache');
    var store = new KVS({
    	host:'127.0.0.1', // the memcache host
    	port:11211 // the memcache port
    }); 
    store.set('name', new Buffer('value is a buffer'), function(err) {…});
    store.get('name', function(err, value) { … });
    store.remove('name', function(err) { … });
    store.list('name', function(err, val) {
    	// MemCacheD does not have this facility. It will therefor always return: { count:0, values:[] }
    });

## License (MIT)
**Copyright (c) 2013 [Philipp Dunkel](mailto:pip@pipobscure.com)**

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

