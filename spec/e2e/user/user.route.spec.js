var jwt = require('jsonwebtoken');
var app = require('../../../server');
var request = require('supertest')(app);
var config = require('../../../config/config');

var user;

describe('User route test', function() {

  it('should create new user with complete credentials', function(done) {
    user = {
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton'
    };
    request.post('/api/signup')
    .send(user)
    .expect(200)
    .end(function(err){
      expect(err).toBe(null);
      done();
    });
  });

  it('should not create new user with duplicate credentials', function(done) {
    user = {
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton'
    };
    request.post('/api/signup')
    .send(user)
    .expect(401)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Username already exists!'}));
      done();
    });
  });

  it('should not create new user with undefined username', function(done) {
    user = {
      username: undefined,
      email: 'outta@gmail.com',
      password: 'compton'
    };
    request.post('/api/signup')
    .send(user)
    .expect(401)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Invalid Username or Email or Password!'
      }));
      done();
    });
  });

  it('should not create new user with undefined email', function(done) {
    user = {
      username: 'straight',
      email: undefined,
      password: 'compton'
    };
    request.post('/api/signup')
    .send(user)
    .expect(401)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Invalid Username or Email or Password!'
      }));
      done();
    });
  });

  it('should not create new user with undefined password', function(done) {
    user = {
      username: 'straight',
      email: 'outta@gmail.com',
      password: undefined
    };
    request.post('/api/signup')
    .send(user)
    .expect(401)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Invalid Username or Email or Password!'
      }));
      done();
    });
  });

  it('should login a user with correct credentials', function(done) {
    user = {
      username: 'straight',
      password: 'compton'
    };
    request.post('/api/login')
    .send(user)
    .expect(200)
    .end(function(err){
      expect(err).toBe(null);
      done();
    });
  });

  it('should not login a user with incorrect username', function(done) {
    user = {
      username: 'bent',
      password: 'compton'
    };
    request.post('/api/login')
    .send(user)
    .expect(401)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Invalid Username or Password!'
      }));
      done();
    });
  });

  it('should not login a user with wrong password', function(done) {
    user = {
      username: 'straight',
      password: 'inglewood'
    };
    request.post('/api/login')
    .send(user)
    .expect(401)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Invalid Username or Password!'
      }));
      done();
    });
  });
});

var token;

describe('User route test', function() {

   beforeEach(function(done) {
    token = jwt.sign(user, config.secret, { expiresInMinutes: 1440 });
    done();
  });

  it('should return a single user', function(done) {
    request.get('/api/v1/users/:username')
    .set('x-access-token', token)
    .expect(200)
    .end(function(err){
      expect(err).toBe(null);
      done();
    });
  });

  it('should not return a user without token', function(done) {
    request.get('/api/v1/users/:username')
    .expect(403)
    .end(function(err, response) {
      expect(response.body).toEqual(jasmine.objectContaining( {
        success: false,
        message: 'No token provided.'
      }));
      done();
    });
  });

  it('should edit a user details', function(done) {
    user = {
      username:'curve'
    };
    request.put('/api/v1/users/straight')
    .set('x-access-token', token)
    .expect(200)
    .send(user)
    .end(function(err){
      expect(err).toBe(null);
      done();
    });
  });

  it('should delete a user', function(done) {
    request.delete('/api/v1/users/curve')
    .set('x-access-token', token)
    .expect(200)
    .end(function(err){
      expect(err).toBe(null);
      done();
    });
  });
});
