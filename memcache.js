/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = MemCache;

var memcache = require('memcache');
var once = require('once');
var Abstract = require('kvs-abstract');

Abstract.bequeath(MemCache);
function MemCache(options) {
  Abstract.instantiate(this);
  options = options || {};
  this.host = options.host || '127.0.0.1';
  this.port = options.port || 11211;
}

MemCache.prototype.start = function start(callback) {
  callback = once(callback.bind(this));
  if (this.client) return setImmediate(callback.bind(this, null, this.client));

  var self = this;
  var client = new memcache.Client(this.port, this.host);

  client.port = this.port;
  client.host = this.host;
  client.on('connect', function(){
    self.client = client;
    callback(null, client);
  });
  client.on('close', function(){
    self.client = undefined;
  });
  client.once('timeout', function(){
    self.client = undefined;
    callback(new Error('timeout'));
  });
  client.once('error', function(e){
    self.client = undefined;
    callback(e);
  });

  client.connect();
};

MemCache.prototype.stop = function stop() {
  if (!this.client) return;
  this.client.close();
};

MemCache.prototype._get = function get(name, callback) {
  this.start(function(err, client) {
    if (err) return callback(err);
    client.get(name, function(err, value) {
      try {
        value = err ? value : new Buffer(value, 'base64');
      } catch(ex) {
        err = ex;
      }
      if (err) return callback(err);
      callback(null, Buffer.isBuffer(value) ? value : null);
    });
  });
};

MemCache.prototype._set = function(name, value, callback) {
  value = Buffer.isBuffer(value) ? value : new Buffer(String(value), 'utf-8');
  this.start(function(err, client) {
    if (err) return callback(err);
    client.set(name, value.toString('base64'), function(err, val) {
      if (err) return callback(err);
      if (val==='STORED') return callback(null);
      return callback(new Error(val));
    });
  });
};

MemCache.prototype._remove = function(name, callback) {
  this.start(function(err, client) {
    if (err) return callback(err);
    client.delete(name, callback);
  });
};
