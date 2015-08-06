//var app = require('../server');
var request = require('supertest')(app);
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWMwOGU4ZDY1ZjVmNDRiMGUwMDAwMDIiLCJwYXNzd29yZCI6IiQyYSQxMCR2Yy9hcllaY20vTk5NL1hVY1paOU9PcFF0RXZid1QzNHdsMS55T3FjMWR6WHFKZlFHQVBzRyIsImVtYWlsIjoiYW5keUBnbWFpbC5jb20iLCJzaG9wT3duZXJuYW1lIjoiYW5keSJ9.Mlra6yyyntLK42hMNO9x_iFHWeumIeamooah5EniiIo';

describe("ShopOwner route test", function() {

  it('should make a POST request and create new shopOwner', function(done) {
    var shopOwner = {
      shopOwnername:'rudeman',
      email: 'rudeman@gmail.com',
      address: 'No 2 Funsho street Sabo',
      password:'ruderude'
    };
    request.post('/api/ssignup')
    .send(shopOwner)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    }); 
  });

  it('should make a POST request and login a shopOwner', function(done) {
    var shopOwner = {
      shopOwnername:'rudeman',
      password:'ruderude'
    };
    request.post('/api/slogin')
    .send(shopOwner)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    }); 
  });

  it('should make a GET request and return created shopOwners', function(done) {
    request.get('/api/shopOwners?token='+token)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    });
  });

  it('should make a GET request and return a single shopOwner', function(done) {
    request.get('/api/shopOwners/:shopOwner_id?token='+token)
    .expect(200)
    .end(function(err, res) {
      expect(err).toBe(null);
      done();
    });
  });  

  it('should make a PUT request and edit a shopOwner details', function(done) {
    var shopOwner = {
      shopOwnername:'evilman',
      email: 'rudeman@gmail.com',
      address: 'No 2 Funsho street Sabo',
      password:'ruderude'
    };
    request.put('/api/users/:user_id?token='+token)
    .send(shopOwner)
    .expect(200)
    .end(function(err, res){
      expect(err).toBe(null);
      done();
    }); 
  });

  it('should make a DELETE request and delete a shopOwner', function(done) {
    request.delete('/api/shopOwners/:shopOwner_id?token='+token)
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

