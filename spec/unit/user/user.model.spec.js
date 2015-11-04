var User = require('../../../app/models/user.model');

var user;

describe('User Model', function() {
  beforeEach(function(done) {
    user = new User();
    done();
  });

  it('should not register if firstname field is empty', function(done) {
    user.name = {
      firstname: '',
      lastname: 'David'
    };
    user.username = '';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if lastname field is empty', function(done) {
    user.name = {
      firstname: 'John',
      lastname: ''
    };
    user.username = '';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if username field is empty', function(done) {
    user.name = {
      firstname: 'John',
      lastname: 'David'
    };
    user.username = '';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if email field is empty', function(done) {
    user.name = {
      firstname: 'John',
      lastname: 'David'
    };
    user.username = 'badman';
    user.email = '';
    user.password = 'badbad';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if password field is empty', function(done) {
    user.name = {
      firstname: 'John',
      lastname: 'David'
    };
    user.username = 'badman';
    user.email = 'badman@gmail.com';
    user.password = '';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should register a user with complete credentials', function(done) {
    user.name = {
      firstname: 'John',
      lastname: 'David'
    };
    user.username = 'badman';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.save(function(err) {
      expect(err).toBe(null);
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

});
