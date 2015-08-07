var User = require('../../../app/models/user');
var mongoose = require('mongoose');

var user;

describe('User Model', function(){
  beforeEach(function(done){
    user = new User();
    done();
  });

  it('should not register if username field is empty', function(done){
    user.username = '';
    user.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if email field is empty', function(done){
    user.email = '';
    user.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if password field is empty', function(done){
    user.password = '';
    user.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should register a user with complete credentials', function(done){
    user.username = 'badman';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.save(function(err){
      expect(err).toBe(null); 
    });
    done();
  });

});
