'use strict';
var request = require('supertest');

var app = require('../../../server');
var Saloon = require('../../../app/models/saloon.model');
var Hair = require('../../../app/models/hairstyle.model');

describe('Saloon details', function() {

  //empty the database after each test.
  afterEach(function(done) {
    Saloon.remove({}, function() {

    });
    done();
  });

  //test for to check if app prevents posting of a
  //saloon without name
  it('without name should NOT be posted', function(done) {

    request(app)
      .post('/saloons')
      .send({
        name: undefined,
        address: '314, Herbert Macaulay Way, Yaba Lagos'
      })
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter the name of your saloon'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  //test for to check if app prevents posting of an hairstyle
  //without address details
  it('without address details should NOT be posted', function(done) {

    request(app)
      .post('/saloons')
      .set('Accept', 'application/json')
      .send({
        name: 'Beauty Shop',
        address: undefined
      })
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter the address of your saloon'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });


});


describe('Saloons', function() {

  //create test data before each test.
  beforeEach(function(done) {
    Saloon.remove({}, function() {});

    var sampleData = {
      _id: '55dc7552485fdd167d689439',
      name: 'Beauty Shop',
      address: '314, Herbert Macaulay Way, Yaba Lagos'
    };
    var testSaloon = new Saloon(sampleData);
    testSaloon.save(function(err) {
      if (err) {
        return err;
      }
    });
    done();
  });


  //empty the database after each test.
  afterEach(function(done) {
    Saloon.remove({}, function() {});
    done();
  });



  //saloon posting test
  it('should POST successfully', function(done) {

    var newSample = {
      name: 'Beauty Shop Two',
      address: '324, Herbert Macaulay Way, Yaba Lagos'
    };
    request(app)
      .post('/saloons')
      .set('Accept', 'application/json')
      .send(newSample)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'your saloon successfully added to list'
        }));
        expect(response.statusCode).toBe(200);
        done();
      });
      done();
  });


  //test for getting the details of a saloon
  it('GET request for a saloon should return the saloon', function(done) {
    var id = '55dc7552485fdd167d689439';
    request(app)
      .get('/saloons/' + id)
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

  it('should populate hairstyles\' list of the saloon', function(done) {

    var sampleHair= {
      _id: '55dc7552485fdd167d681111',
      name: 'uglyHair',
      description: 'another sample hairstyle for tests',
      image: 'hair_henna.jpg',
      date: Date.now(),
      rating: 1
    };

    var testHair = new Hair(sampleHair);

    testHair.save(function(err) {
      if (err) {
        return err;
      }
    });

    var saloonSample = new Saloon({
      _id: '55dc7552485fdd167d622222',
      name: 'Beauty Place',
      address: '324, Herbert Macaulay Way, Yaba Lagos',
      hairstyles: sampleHair._id
    });

    saloonSample.save(function(err) {
      if (err) {
        return err;
      }
    });

    var id = '55dc7552485fdd167d622222';
    request(app)
      .get('/saloons/' + id)
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


  //hairstyle remove test
  it('should delete successfully', function(done) {
    var id = '55dc7552485fdd167d689439';
    request(app)
      .delete('/saloons/' + id)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Saloon deleted from list'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/saloons/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(jasmine.objectContaining({
              success: false,
              message: 'Saloon not found'
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

  //   //hairstyle update test
  it('details should update successfully', function(done) {
    var id = '55dc7552485fdd167d689439';
    var updated = {
      name: 'Beauty Shop Two',
      address: '324, Herbert Macaulay Way, Yaba Lagos'
    };
    request(app)
      .put('/saloons/' + id)
      .send(updated)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Saloon Updated!'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/saloons/' + id)
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

});
