//var app = require('../server');
var request = require('supertest')(app);
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWI4YmY0MmZiODVjYzc3MzQwMDAwMDEiLCJwYXNzd29yZCI6IiQyYSQxMCRVclBvUFJFc1FvejFpMkdZZTVaTlllbjJINkN2WnpMVWlpTXExbFlsWXM3bndLRUdLc0dhMiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdCJ9.2biiA0xVj70bgiydlbay3eP9ZvgyMn3vHx61mdfNEJo';

describe("User route test", function() {

  it('should make a POST request and create new user', function(done) {
    var user = {
      username:'badman',
      email: 'badman@gmail.com',
      password:'badbad'
    };
    request.post('/api/signup')
    .send(user)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    }); 
  });

  it('should make a POST request and login a user', function(done) {
    var user = {
      username:'badman',
      password:'badbad'
    };
    request.post('/api/login')
    .send(user)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    }); 
  });

  it('should make a GET request and return the home page', function(done) {
    request.get('/')
    .expect(200)
    .end(function(err, res) {
      expect(err).toBe(null);
      done();
    });
  });

  it('should make a GET request and return created users', function(done) {
    request.get('/api/users?token='+token)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    });
  });

  it('should make a GET request and return a single user', function(done) {
    request.get('/api/users/:user_id?token='+token)
    .expect(200)
    .end(function(err, res) {
      expect(err).toBe(null);
      done();
    });
  });  

  it('should make a PUT request and edit a user details', function(done) {
    var user = {
      username:'goodman',
      email: 'badman@gmail.com',
      password:'badbad'
    };
    request.put('/api/users/:user_id?token='+token)
    .send(user)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    }); 
  });

  it('should make a DELETE request and delete a user', function(done) {
    request.delete('/api/users/:user_id?token='+token)
    .expect(200)
    .end(function(err, res) {
      expect(err).toBe(null);
      done();
    });
  });

  it("should return an error when a route is not found", function(done) {
   request.get('/')
   .expect(404)
   .end(function(err, res){
     expect(res.error).not.toBe(null);
   });
   done();  
  });

});

