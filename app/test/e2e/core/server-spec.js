'use strict';

var request = require('supertest');
var app = require('../../../../server');

describe('server test', function() {

  it('should respond on connection /api',
    function(done) {

    request(app)
    .get('/api')
    .expect(200)
    .end(function(err) {
      if (err) {
        return done(err);
      }
      done();
      });
    });
});
