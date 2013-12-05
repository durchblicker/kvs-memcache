/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

var Lab = require('lab');

var MemCache = require('../');

var kvsM = new MemCache();
var testData = new Buffer('test');

Lab.test('set a value', function(done) {
  kvsM.set('test', testData, function(err) {
    Lab.expect(!err).to.equal(true);
    done();
  });
});

Lab.test('get a value', function(done) {
  kvsM.get('test', function(err, val) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(val).to.be.an('object');
    Lab.expect(val.toString()).to.equal('test');
    done();
  });
});

Lab.test('remove a value', function(done) {
  kvsM.remove('test', function(err) {
    Lab.expect(!err).to.equal(true);
    done();
  });
});
