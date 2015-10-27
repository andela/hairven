'use strict';
var request = require('supertest');
var fs = require('fs');

var app = require('../../../server');
var Salon = require('../../../app/models/salon.model');
var Hair = require('../../../app/models/hairstyle.model');

var hairstyleData, salonData;

fs.readFile(__dirname + '/fixtures/hairstyleData.json', function(err, data) {
  if (err) {
    console.log(err);
  }
  hairstyleData = JSON.parse(data);
});

fs.readFile(__dirname + '/fixtures/salonData.json', function(err, data) {
  if (err) {
    console.log(err);
  }
  salonData = JSON.parse(data);
});

describe('salon details', function() {

  //empty the database after each test.
  afterEach(function(done) {
    Salon.remove({}, function() {

    });
    done();
  });

  //test for to check if app prevents posting of a
  //salon without name
  it('without name should NOT be posted', function(done) {

    request(app)
      .post('/api/salons')
      .send({
        name: undefined,
        address: '314, Herbert Macaulay Way, Yaba Lagos'
      })
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter the name of your salon'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  //test for to check if app prevents posting of an hairstyle
  //without address details
  it('without address details should NOT be posted', function(done) {

    request(app)
      .post('/api/salons')
      .set('Accept', 'application/json')
      .send({
        name: 'Beauty Shop',
        address: undefined
      })
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter the address of your salon'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });


});


describe('salons', function() {

  var id;

  //create test data before each test.
  beforeEach(function(done) {
    var samplesalon = new Salon(salonData[0]);
    samplesalon.save(function(err) {
      if (err) {
        return err;
      }
    });
    id = samplesalon.id;
    done();
  });

  //empty the database after each test.
  afterEach(function(done) {
    Salon.remove({}, function() {});
    done();
  });


  //test for getting the details of a salon
  it('GET request for a salon should return the salon', function(done) {

    request(app)
      .get('/api/salons/' + id)
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('Beauty Shop');
        expect(response.body.address)
          .toEqual('314, Herbert Macaulay Way, Yaba Lagos');
        if (err) {
          return err;
        }
        done();
      });

  });
  
  //salon posting test
  it('should POST successfully', function(done) {

    var newSample = {
      name: 'Beauty Shop Two',
      address: '324, Herbert Macaulay Way, Yaba Lagos'
    };
    request(app)
      .post('/api/salons')
      .set('Accept', 'application/json')
      .send(newSample)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'your salon successfully added to list'
        }));
        expect(response.statusCode).toBe(200);
        done();
      });
    done();
  });

  it('should populate hairstyles\' list of the salon', function(done) {

    var testHair = new Hair(hairstyleData[1]);

    testHair.save(function(err) {
      if (err) {
        return err;
      }
    });

    salonData[1].hairstyles = testHair.id;
    var samplesalonTwo = new Salon(salonData[1]);

    samplesalonTwo.save(function(err) {
      if (err) {
        return err;
      }
    });

    id = samplesalonTwo.id;

    request(app)
      .get('/api/salons/' + id)
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.body.name).toEqual('Beauty Place');
        expect(response.statusCode).toBe(200);
        expect(response.body.hairstyles).toBeDefined();
        expect(response.body.hairstyles[0].name)
          .toEqual('uglyHair');
        expect(response.body.hairstyles[0].description)
          .toEqual('another sample hairstyle for tests');
        if (err) {
          return err;
        }
        done();
      });

    afterEach(function(done) {
      Hair.remove({}, function() {});
      done();
    });

  });

  //   //hairstyle update test
  it('details should update successfully', function(done) {

    var updated = {
      name: 'Beauty Shop Two',
      address: '324, Herbert Macaulay Way, Yaba Lagos'
    };
    request(app)
      .put('/api/salons/' + id)
      .send(updated)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'salon Updated!'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/api/salons/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual('Beauty Shop Two');
            expect(response.body.address)
              .toEqual('324, Herbert Macaulay Way, Yaba Lagos');
            if (err) {
              return err;
            }
            done();
          });
        if (err) {
          return err;
        }
        done();
      });
  });

  //salon remove test
  it('should delete successfully', function(done) {

    request(app)
      .delete('/api/salons/' + id)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'salon deleted from list'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/api/salons/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(jasmine.objectContaining({
              success: false,
              message: 'salon not found'
            }));
            if (err) {
              return err;
            }
            done();
          });
        if (err) {
          return err;
        }
        done();
      });
  });

});
