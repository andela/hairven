'use strict';
var request = require('supertest');
var fs = require('fs');

var app = require('../../../server');
var Hair = require('../../../app/models/hairstyle.model');
var Salon = require('../../../app/models/salon.model');

var hairstyleData,
  salonData;

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

describe('Hairstyles details', function() {

  //empty the database after each test.
  afterEach(function(done) {
    Hair.remove({}, function() {

    });
    done();
  });

  //test for to check if app prevents posting of an
  //hairstyle without image
  it('without image should NOT be posted', function(done) {

    request(app)
      .post('/api/hairstyles')
      .send({
        name: 'sampleHair',
        description: 'sample hairstyles'
      })
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please upload a photo of the Hairstyle'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  it('without name should NOT be posted', function(done) {

    request(app)
      .post('/api/hairstyles')
      .field('name', '')
      .field('description', 'sample hairstyles')
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter Hairstyle name'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  //test for to check if app prevents posting of an hairstyle
  //without description
  it('without description should NOT be posted', function(done) {

    request(app)
      .post('/api/hairstyles')
      .set('Accept', 'application/json')
      .field('name', 'sampleHair')
      .field('description', '')
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter a description for the Hairstyle'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });


});


describe('api/hairstyles', function() {

  var id;

  //create test data before each test.
  beforeEach(function(done) {
    var testHair = new Hair(hairstyleData[0]);
    testHair.save(function(err) {
      if (err) {
        return err;
      }
    });
    id = testHair._id;
    done();
  });


  //empty the database after each test.
  afterEach(function(done) {
    Hair.remove({}, function() {});
    done();
  });


  //hairstyle posting test
  it('should POST successfully', function(done) {

    request(app)
      .post('/api/hairstyles')
      .field('_id', '55dc7552485fdd152d689439')
      .field('name', 'uglyHair')
      .field('description', 'a sample hairstyle for tests')
      .field('rating', 4)
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Hairstyle Saved!'
        }));
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  //test for getting all hairstyles in database (i.e, for populating
  //the gallery in view)
  it('GET request should return all successfully', function(done) {


    var testHairTwo = new Hair(hairstyleData[1]);

    testHairTwo.save(function(err) {
      if (err) {
        return err;
      }
    });

    request(app)
      .get('/api/hairstyles')
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].name).toEqual('fineHair');
        expect(response.body[0].description)
          .toEqual('a sample hairstyle for tests');
        expect(response.body[0].rating).toEqual(4);
        expect(response.body[1].name).toEqual('uglyHair');
        expect(response.body[1].description)
          .toEqual('another sample hairstyle for tests');
        expect(response.body[1].rating).toEqual(1);
        if (err) {
          return err;
        }
        done();
      });
  });

  //test for get single hairstyle (for viewing a particular hairstyle details)
  it('GET request for a hairstyle should return the hairstyle', function(done) {

    request(app)
      .get('/api/hairstyles/' + id)
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('fineHair');
        expect(response.body.description)
          .toEqual('a sample hairstyle for tests');
        expect(response.body.rating).toEqual(4);
        if (err) {
          return err;
        }
        done();

      });

  });

  //salon populate test
  it('should populate salon property of the hairstyle', function(done) {

    Salon.remove({}, function() {});
    var salonSample = new Salon(salonData[1]);

    salonSample.save(function(err) {
      if (err) {
        console.log(err);
      }
    });

    hairstyleData[1].salon = salonSample.id;
    var testHairTwo = new Hair(hairstyleData[1]);

    testHairTwo.save(function(err) {
      if (err) {
        return err;
      }
    });

    id = testHairTwo.id;

    request(app)
      .get('/api/hairstyles/' + id)
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.body.name).toEqual('uglyHair');
        expect(response.statusCode).toBe(200);
        expect(response.body.salon).toBeDefined();
        expect(response.body.salon.name)
          .toEqual('Beauty Place');
        expect(response.body.salon.address)
          .toEqual('334, Herbert Macaulay Way, Yaba Lagos');
        if (err) {
          return err;
        }
        done();
      });

    afterEach(function(done) {
      Salon.remove({}, function() {});
      done();
    });

  });

  //hairstyle update test
  it('details should update successfully', function(done) {
    request(app)
      .put('/api/hairstyles/' + id)
      .field('name', 'Shuku')
      .field('rating', 3)
      .field('date', Date.now())
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Hairstyle Details Updated!'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/api/hairstyles/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual('Shuku');
            expect(response.body.description)
              .toEqual('a sample hairstyle for tests');
            expect(response.body.rating).toEqual(3);

            if (err) {
              return err;
            }
          });
        if (err) {
          return err;
        }
        done();
      });
  });

  //hairstyle remove test
  //salon remove test
  it('should delete successfully', function(done) {

    request(app)
      .delete('/api/hairstyles/' + id)
      .end(function(err, response) {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Hairstyle Deleted Successfully!'
        }));
        request(app)
          .get('/api/hairstyles/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(404);
            expect(response.body)
              .toEqual(jasmine.objectContaining({
                success: false,
                message: 'Hairstyle not found'
              }));
            if (err) {
              return err;
            }
          });
        if (err) {
          return err;
        }
        done();
      });
  });

});
