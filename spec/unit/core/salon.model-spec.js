'use strict';

var Salon = require('../../../app/models/salon.model');
describe('salon Schema', function() {

  it('should not save a salon without name', function() {
    var sampleDetails = {
      address: '314, Herbert Macaulay Way, Yaba Lagos'
    };
    var salonSample = new Salon(sampleDetails);
    salonSample.save(function(err) {
      if (err) {
        return err;
      }
    expect(err).not.toBe(null);
    expect(typeof err).toEqual(typeof {});
    });

  });

  it('should not save a salon without address details', function() {
    var sampleDetails = {
      name: 'Beauty Shop'
    };
    var salonSample = new Salon(sampleDetails);
    salonSample.save(function(err) {
      if (err) {
        return err;
      }
    expect(err).not.toBe(null);
    expect(typeof err).toEqual(typeof {});
    });

  });

  it('should create a salon model', function() {
    var sampleDetails = {
      name: 'House of Tara',
      address: 'Kasumu Ekemode Street, Victoria Island Lagos'
      };
    var salonSample = new Salon(sampleDetails);
    salonSample.save(function(err) {
      if (err) {
        return err;
      }
    });

    expect(salonSample).toBeDefined();
    expect(typeof salonSample).toEqual(typeof {});
    expect(salonSample.name).toEqual('House of Tara');
    expect(salonSample.address)
      .toEqual('Kasumu Ekemode Street, Victoria Island Lagos');
  });

  afterEach(function() {
    Salon.remove({}, function(err) {
    if(err){
      return err;
    }
    });
  });
});
