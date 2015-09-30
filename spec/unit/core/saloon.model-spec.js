'use strict';

var Saloon = require('../../../app/models/saloon.model');
describe('Saloon Schema', function() {

  it('should not save a saloon without name', function() {
    var sampleDetails = {
      address: '314, Herbert Macaulay Way, Yaba Lagos'
    };
    var saloonSample = new Saloon(sampleDetails);
    saloonSample.save(function(err) {
      if (err) {
        return err;
      }
    expect(err).not.toBe(null);
    expect(typeof err).toEqual(typeof {});
    });

  });

  it('should not save a saloon without address details', function() {
    var sampleDetails = {
      name: 'Beauty Shop'
    };
    var saloonSample = new Saloon(sampleDetails);
    saloonSample.save(function(err) {
      if (err) {
        return err;
      }
    expect(err).not.toBe(null);
    expect(typeof err).toEqual(typeof {});
    });

  });

  it('should create a saloon model', function() {
    var sampleDetails = {
      name: 'House of Tara',
      address: 'Kasumu Ekemode Street, Victoria Island Lagos'
      };
    var saloonSample = new Saloon(sampleDetails);
    saloonSample.save(function(err) {
      if (err) {
        return err;
      }
    });

    expect(saloonSample).toBeDefined();
    expect(typeof saloonSample).toEqual(typeof {});
    expect(saloonSample.name).toEqual('House of Tara');
    expect(saloonSample.address)
      .toEqual('Kasumu Ekemode Street, Victoria Island Lagos');
  });

  afterEach(function() {
    Saloon.remove({}, function(err) {
    if(err){
      return err;
    }
    });
  });
});
