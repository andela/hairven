'use strict';
var request = require('supertest');
var app = require('../../../server');

describe('server test', function() {

  it('should respond on connection',
    function(done) {

    request(app)
    .get('/')
    .expect(200)
    .end(function(err) {
      if (err) {
        return done(err);
      }
      done();
      });
    });
});
