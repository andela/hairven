var jwt = require('jsonwebtoken');
var app = require('../../../server');
var request = require('supertest')(app);
var config = require('../../../config/config');
var User = require('../../../app/models/user.model');
var user;

describe('User route test', function() {

  it('should create new user with complete credentials', function(done) {
    user = {
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton',
      role: 'user'
    };
    request.post('/api/signup')
      .send(user)
      .expect(200)
      .end(function(err) {
        expect(err).toBe(null);
        done();
      });
  });

  it('should not create new user with duplicate credentials', function(done) {
    user = {
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton',
      role: 'user'
    };
    request.post('/api/signup')
      .send(user)
      .expect(401)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Username already exists!'
        }));
        done();
      });
  });

  it('should not create new user with undefined username', function(done) {
    user = {
      name: {
        first: 'John',
        last: 'David'
      },
      username: undefined,
      email: 'outta@gmail.com',
      password: 'compton',
      role: 'user'
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

  it('should not create new user with undefined first or last name',
    function(done) {
      user = {
        name: {
          first: undefined,
          last: undefined
        },
        username: 'straight',
        email: 'outta@gmail.com',
        password: 'compton',
        role: 'user'
      };
      request.post('/api/signup')
        .send(user)
        .expect(401)
        .end(function(err, response) {
          expect(response.body).toEqual(jasmine.objectContaining({
            success: false,
            message: 'Invalid First or Last Name!'
          }));
          done();
        });
    });

  it('should not create new user with undefined email', function(done) {
    user = {
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: undefined,
      password: 'compton',
      role: 'user'
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
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: 'outta@gmail.com',
      password: undefined,
      role: 'user'
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

  it('should not create new user with undefined role', function(done) {
    user = {
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton',
      role: undefined
    };
    request.post('/api/signup')
      .send(user)
      .end(function(err, response) {
        expect(401);
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Invalid Role Provided!'
        }));
        done();
      });
  });

  it('should not create new user with a role different from user or stylist', function(done) {
    user = {
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton',
      role: 'admin'
    };
    request.post('/api/signup')
      .send(user)
      .expect(401)
      .end(function(err, response) {
        expect(response.body.errors).not.toBe(null);
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
      .end(function(err) {
        expect(err).toBe(null);
        done();
      });
  });

  it('should not login a user as a stylist', function(done) {
    user = {
      username: 'straight',
      password: 'compton'
    };
    request.post('/api/salonlogin')
      .send(user)
      .end(function(err, response) {
        expect(401);
        expect(response.body)
          .toEqual(jasmine.objectContaining({
            success: false,
            message: 'Cannot find account,\n Please register as stylist or salon owner!'
          }));
        done();
      });
  });

  it('should login a stylist/salon owner with correct credentials', function(done) {
    User.remove({}, function() {});
    
    user = new User({
      name: {
        first: 'John',
        last: 'David'
      },
      username: 'straight',
      email: 'outta@gmail.com',
      password: 'compton',
      role: 'stylist'
    });

    user.save(function(err) {
      if (err) {
        console.log(err);
      };
    });

    var userDetails = {
      username: 'straight',
      password: 'compton'
    };
    request.post('/api/salonlogin')
      .send(userDetails)
      .end(function(err, response) {
        expect(200);
        expect(err).toBe(null);
        expect(response.body.message).toEqual('You are logged in');
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
    token = jwt.sign(user, config.secret, {
      expiresInMinutes: 1440
    });
    done();
  });

  it('should return a single user', function(done) {
    request.get('/api/v1/users/:username')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err) {
        expect(err).toBe(null);
        done();
      });
  });

  it('should not return a user without token', function(done) {
    request.get('/api/v1/users/:username')
      .expect(403)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'No token provided.'
        }));
        done();
      });
  });

  it('should edit a user details', function(done) {
    user = {
      username: 'curve'
    };
    request.put('/api/v1/users/straight')
      .set('x-access-token', token)
      .expect(200)
      .send(user)
      .end(function(err) {
        expect(err).toBe(null);
        done();
      });
  });

  it('should delete a user', function(done) {
    request.delete('/api/v1/users/curve')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err) {
        expect(err).toBe(null);
        done();
      });
  });
});
