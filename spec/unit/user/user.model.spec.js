var User = require('../../../app/models/user.model');

var user;

describe('User Model', function() {
  beforeEach(function(done) {
    user = new User();
    done();
  });

  it('should not register if firstname field is empty', function(done) {
    user.name = {
      first: '',
      last: 'David'
    };
    user.username = '';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.role = 'stylist';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if lastname field is empty', function(done) {
    user.name = {
      first: 'John',
      last: ''
    };
    user.username = '';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.role = 'stylist';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if username field is empty', function(done) {
    user.name = {
      first: 'John',
      last: 'David'
    };
    user.username = '';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.role = 'stylist';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if email field is empty', function(done) {
    user.name = {
      first: 'John',
      last: 'David'
    };
    user.username = 'badman';
    user.email = '';
    user.password = 'badbad';
    user.role = 'stylist';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if password field is empty', function(done) {
    user.name = {
      first: 'John',
      last: 'David'
    };
    user.username = 'badman';
    user.email = 'badman@gmail.com';
    user.password = '';
    user.role = 'stylist';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if role field is empty', function(done) {
    user.name = {
      first: 'John',
      last: 'David'
    };
    user.username = 'badman';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.role = '';
    user.save(function(err) {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should register a user with complete credentials', function(done) {
    user.name = {
      first: 'John',
      last: 'David'
    };
    user.username = 'badman';
    user.email = 'badman@gmail.com';
    user.password = 'badbad';
    user.role = 'stylist';
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
