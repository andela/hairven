var ShopOwner = require('../app/models/shopOwner');
var mongoose = require('mongoose');
var shopOwnerModel = mongoose.model('ShopOwner');

var shopOwner;

describe('Shop Owner Model', function(done){
  beforeEach(function(done){
    shopOwner = new shopOwnerModel();
    done();
  });

  it('should not register if shopOwnername field is empty', function(done){
    shopOwner.shopOwnername = '';
    shopOwner.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if email field is empty', function(done){
    shopOwner.email = '';
    shopOwner.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if address field is empty', function(done){
    shopOwner.address = '';
    shopOwner.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should not register if password field is empty', function(done){
    shopOwner.password = '';
    shopOwner.save(function(err){
      expect(err).not.toBe(null);
      done();
    });
  });

  it('should register a shopOwner with complete credentials', function(done){
    shopOwner.shopOwnername = 'goodman';
    shopOwner.email = 'goodman@gmail.com';
    shopOwner.address = 'No 2/4 Fusho Street Yaba';
    shopOwner.password = 'goodgood';
    shopOwner.save(function(err){
      expect(err).toBe(null); 
    });
    done();
  });

});
