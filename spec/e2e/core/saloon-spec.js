'use strict';
var request = require('supertest');
var fs = require('fs');

var app = require('../../../server');
var Saloon = require('../../../app/models/saloon.model');
var Hair = require('../../../app/models/hairstyle.model');

var hairstyleData, saloonData;

fs.readFile(__dirname + '/fixtures/hairstyleData.json', function(err, data) {
  if (err) {
    console.log(err);
  }
  hairstyleData = JSON.parse(data);
});

fs.readFile(__dirname + '/fixtures/saloonData.json', function(err, data) {
  if (err) {
    console.log(err);
  }
  saloonData = JSON.parse(data);
});

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

  var id;

  //create test data before each test.
  beforeEach(function(done) {
    var sampleSaloon = new Saloon(saloonData[0]);
    sampleSaloon.save(function(err) {
      if (err) {
        return err;
      }
    });
    id = sampleSaloon.id;
    done();
  });

  //empty the database after each test.
  afterEach(function(done) {
    Saloon.remove({}, function() {});
    done();
  });


  //test for getting the details of a saloon
  it('GET request for a saloon should return the saloon', function(done) {

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

  it('should populate hairstyles\' list of the saloon', function(done) {

    var testHair = new Hair(hairstyleData[1]);

    testHair.save(function(err) {
      if (err) {
        return err;
      }
    });

    saloonData[1].hairstyles = testHair.id;
    var sampleSaloonTwo = new Saloon(saloonData[1]);

    sampleSaloonTwo.save(function(err) {
      if (err) {
        return err;
      }
    });

    id = sampleSaloonTwo.id;

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

  //   //hairstyle update test
  it('details should update successfully', function(done) {

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

  //saloon remove test
  it('should delete successfully', function(done) {

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

});
